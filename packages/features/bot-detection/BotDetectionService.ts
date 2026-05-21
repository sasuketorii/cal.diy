// REVREX Phase 5: Vercel BotID (`botid/server`) は VPS で解決不能なため完全に no-op 化。
// build-time の静的解析 (Next.js webpack) が `botid/server` の dynamic import を解決しようとして
// fail していたため、import 自体を除去する。bot 対策は Cloudflare Worker (Turnstile / WAF) が代替。
import type { IncomingHttpHeaders } from "node:http";

import type { EventTypeRepository } from "@calcom/features/eventtypes/repositories/eventTypeRepository";
import type { FeaturesRepository } from "@calcom/features/flags/features.repository";

interface BotDetectionConfig {
  eventTypeId?: number;
  headers: IncomingHttpHeaders;
}

export class BotDetectionService {
  constructor(
    private featuresRepository: FeaturesRepository,
    private eventTypeRepository: EventTypeRepository
  ) {
    // Unused on REVREX deployment, but kept on the signature for API compatibility
    // with upstream cal.diy callers (e.g. apps/web/pages/api/book/event.ts).
    void this.featuresRepository;
    void this.eventTypeRepository;
  }

  async checkBotDetection(_config: BotDetectionConfig): Promise<void> {
    // No-op: Vercel BotID is disabled on REVREX (Cloudflare Worker handles bot mitigation).
    return;
  }
}
