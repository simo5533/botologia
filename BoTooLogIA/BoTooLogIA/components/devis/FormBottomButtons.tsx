"use client";

type FormBottomButtonsProps = { submitting?: boolean };

export function FormBottomButtons({ submitting }: FormBottomButtonsProps) {
  return (
    <div
      style={{
        marginTop: "40px",
        padding: "32px",
        borderRadius: "20px",
        background: "rgba(0,200,255,0.03)",
        border: "1px solid rgba(0,200,255,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <p
        style={{
          fontSize: "0.85rem",
          color: "rgba(255,255,255,0.45)",
          margin: 0,
          textAlign: "center",
          letterSpacing: "0.03em",
        }}
      >
        Prêt à transformer votre entreprise ?
      </p>

      <div
        style={{
          width: "60px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,200,255,0.4), transparent)",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: "560px",
        }}
      >
        <button
          type="submit"
          disabled={submitting}
          style={{
            flex: 1,
            minWidth: "220px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "16px 28px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #00c8ff 0%, #0094cc 100%)",
            color: "#000d1a",
            fontSize: "0.95rem",
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = "translateY(-3px)";
            btn.style.boxShadow = "0 12px 35px rgba(0,200,255,0.35)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.transform = "translateY(0)";
            btn.style.boxShadow = "none";
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
              transform: "translateX(-100%)",
              transition: "transform 0.5s ease",
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>🚀</span>
          <span style={{ position: "relative", zIndex: 1 }}>Entrer dans le futur</span>
          <span style={{ position: "relative", zIndex: 1 }}>→</span>
        </button>

        <button
          type="button"
          onClick={() => {
            document
              .getElementById("section-creneau")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            flex: 1,
            minWidth: "220px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "16px 28px",
            borderRadius: "14px",
            background: "transparent",
            color: "#00c8ff",
            fontSize: "0.95rem",
            fontWeight: 700,
            border: "1.5px solid rgba(0,200,255,0.35)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.background = "rgba(0,200,255,0.08)";
            btn.style.borderColor = "rgba(0,200,255,0.6)";
            btn.style.transform = "translateY(-2px)";
            btn.style.boxShadow = "0 8px 25px rgba(0,200,255,0.15)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.background = "transparent";
            btn.style.borderColor = "rgba(0,200,255,0.35)";
            btn.style.transform = "translateY(0)";
            btn.style.boxShadow = "none";
          }}
        >
          <span>📅</span>
          <span>Réserver un créneau</span>
        </button>
      </div>

      <p
        style={{
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.2)",
          margin: 0,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        Sans engagement · Réponse garantie sous 24h ouvrées
      </p>
    </div>
  );
}
