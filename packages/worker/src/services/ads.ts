import type { AdCampaign, BlipAd } from "@tdrop/shared";
import type { Bindings } from "../types.js";

const DEFAULT_CAMPAIGNS: AdCampaign[] = [
  {
    id: "cloudflare-r2",
    sponsor: "Cloudflare",
    text: "Host your APIs at the edge with zero egress fees on Cloudflare R2.",
    url: "https://www.cloudflare.com/developer-platform/r2/",
    active: true,
    weight: 10,
    impressions: 0,
    clicks: 0,
    createdAt: Date.now(),
  },
  {
    id: "upstash-redis",
    sponsor: "Upstash",
    text: "Serverless Redis & Kafka with per-request pricing.",
    url: "https://upstash.com/",
    active: true,
    weight: 10,
    impressions: 0,
    clicks: 0,
    createdAt: Date.now(),
  },
  {
    id: "hono-framework",
    sponsor: "Hono",
    text: "Fast, Lightweight, Web-standards framework for any JavaScript runtime.",
    url: "https://hono.dev/",
    active: true,
    weight: 10,
    impressions: 0,
    clicks: 0,
    createdAt: Date.now(),
  },
  {
    id: "supabase-db",
    sponsor: "Supabase",
    text: "The open source Firebase alternative with Postgres and instant APIs.",
    url: "https://supabase.com/",
    active: true,
    weight: 10,
    impressions: 0,
    clicks: 0,
    createdAt: Date.now(),
  },
];

const ADS_KV_KEY = "tdrop:system:ads";

// In-memory fallback
let memoryAds: AdCampaign[] = [...DEFAULT_CAMPAIGNS];

export class AdsService {
  constructor(private readonly env: Bindings) {}

  async getAllCampaigns(): Promise<AdCampaign[]> {
    if (this.env.METADATA) {
      const stored = await this.env.METADATA.get<AdCampaign[]>(ADS_KV_KEY, "json");
      if (stored && Array.isArray(stored) && stored.length > 0) {
        return stored;
      }
      // Initialize KV with defaults if empty
      await this.env.METADATA.put(ADS_KV_KEY, JSON.stringify(DEFAULT_CAMPAIGNS));
    }
    return memoryAds;
  }

  async getBlipAd(domain: string = "tdrop.link"): Promise<{ blip: BlipAd; id: string }> {
    const campaigns = await this.getAllCampaigns();
    const active = campaigns.filter((c) => c.active);

    if (active.length === 0) {
      const fallback = DEFAULT_CAMPAIGNS[0];
      return {
        blip: {
          id: fallback.id,
          sponsor: fallback.sponsor,
          text: fallback.text,
          url: `https://${domain}/ad/${fallback.id}`,
        },
        id: fallback.id,
      };
    }

    // Weighted random selection
    const totalWeight = active.reduce((sum, c) => sum + (c.weight || 1), 0);
    let random = Math.random() * totalWeight;
    let selected = active[0];

    for (const campaign of active) {
      random -= campaign.weight || 1;
      if (random <= 0) {
        selected = campaign;
        break;
      }
    }

    return {
      blip: {
        id: selected.id,
        sponsor: selected.sponsor,
        text: selected.text,
        url: `https://${domain}/ad/${selected.id}`,
      },
      id: selected.id,
    };
  }

  async recordImpression(adId: string): Promise<void> {
    const campaigns = await this.getAllCampaigns();
    const item = campaigns.find((c) => c.id === adId);
    if (!item) return;

    item.impressions = (item.impressions || 0) + 1;

    if (this.env.METADATA) {
      await this.env.METADATA.put(ADS_KV_KEY, JSON.stringify(campaigns));
    } else {
      memoryAds = campaigns;
    }
  }

  async recordClick(adId: string): Promise<string> {
    const campaigns = await this.getAllCampaigns();
    const item = campaigns.find((c) => c.id === adId);

    if (!item) {
      return "https://tdrop.link";
    }

    item.clicks = (item.clicks || 0) + 1;

    if (this.env.METADATA) {
      await this.env.METADATA.put(ADS_KV_KEY, JSON.stringify(campaigns));
    } else {
      memoryAds = campaigns;
    }

    return item.url;
  }

  async saveCampaign(campaign: Partial<AdCampaign> & { sponsor: string; text: string; url: string }): Promise<AdCampaign> {
    const campaigns = await this.getAllCampaigns();
    const id = campaign.id || campaign.sponsor.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Math.random().toString(36).slice(2, 6);

    const existingIndex = campaigns.findIndex((c) => c.id === id);
    const updated: AdCampaign = {
      id,
      sponsor: campaign.sponsor,
      text: campaign.text,
      url: campaign.url,
      active: campaign.active ?? true,
      weight: campaign.weight ?? 10,
      impressions: existingIndex >= 0 ? campaigns[existingIndex].impressions : 0,
      clicks: existingIndex >= 0 ? campaigns[existingIndex].clicks : 0,
      createdAt: existingIndex >= 0 ? campaigns[existingIndex].createdAt : Date.now(),
    };

    if (existingIndex >= 0) {
      campaigns[existingIndex] = updated;
    } else {
      campaigns.push(updated);
    }

    if (this.env.METADATA) {
      await this.env.METADATA.put(ADS_KV_KEY, JSON.stringify(campaigns));
    } else {
      memoryAds = campaigns;
    }

    return updated;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    let campaigns = await this.getAllCampaigns();
    const lenBefore = campaigns.length;
    campaigns = campaigns.filter((c) => c.id !== id);

    if (campaigns.length === lenBefore) return false;

    if (this.env.METADATA) {
      await this.env.METADATA.put(ADS_KV_KEY, JSON.stringify(campaigns));
    } else {
      memoryAds = campaigns;
    }

    return true;
  }
}
