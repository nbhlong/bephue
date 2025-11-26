import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Tailwind CSS v4 Configuration
 *
 * In v4, most theme customization is done in CSS using @theme directive.
 * This config file is now primarily for:
 * - Content paths (where Tailwind scans for class names)
 * - Plugins
 * - Advanced configuration
 *
 * See globals.css for theme customization (colors, fonts, spacing, etc.)
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        // Bamboo pattern background
        ".bg-bamboo-pattern": {
          "background-image":
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 165, 116, 0.05) 10px, rgba(212, 165, 116, 0.05) 20px)",
        },

        // Hover lift effect
        ".hover-lift": {
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        },
        ".hover-lift:hover": {
          transform: "translateY(-4px) scale(1.02)",
          "box-shadow": "0 12px 24px -6px rgba(74, 56, 41, 0.15)",
        },

        // Background gradients (CSS can't use url() in @theme for background-image)
        ".bg-bamboo-texture": {
          "background-image": "url('/images/patterns/bamboo-texture.svg')",
        },
        ".bg-vietnamese-pattern": {
          "background-image": "url('/images/patterns/vietnamese-pattern.svg')",
        },
        ".bg-warm-gradient": {
          "background-image":
            "linear-gradient(135deg, #F5EBD9 0%, #EBD9BC 100%)",
        },
        ".bg-red-gradient": {
          "background-image":
            "linear-gradient(135deg, #D44638 0%, #B73529 100%)",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};

export default config;
