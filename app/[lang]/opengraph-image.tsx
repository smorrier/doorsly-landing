import { ImageResponse } from "next/og";

import { isLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const size = { width: 1200, height: 630 };

export function generateImageMetadata({ params }: { params: { lang: string } }) {
  const alt = isLang(params.lang) ? getDictionary(params.lang).meta.ogImageAlt : "Doorsly";
  return [{ id: "og", alt, size, contentType: "image/png" }];
}

export default function OpenGraphImage({ params }: { params: { lang: string } }) {
  const { og } = getDictionary(isLang(params.lang) ? params.lang : "fr");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #1d3fae 0%, #2f5be0 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
            }}
          >
            <div
              style={{ width: 22, height: 30, borderRadius: 4, background: "#1d3fae" }}
            />
          </div>
          <div style={{ fontSize: 44, fontWeight: 700 }}>Doorsly</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
            {og.headline}
          </div>
          <div style={{ fontSize: 34, marginTop: 28, opacity: 0.9 }}>{og.subline}</div>
        </div>
      </div>
    ),
    size,
  );
}
