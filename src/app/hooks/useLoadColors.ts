import { useEffect } from 'react';
import { invoke } from "@tauri-apps/api/core";

interface GtkColors {
  bg_color: string;
  fg_color: string;
  base_color: string;
  text_color: string;
  accent_color: string;
  accent_fg_color: string;
  success_color: string;
  warning_color: string;
  error_color: string;
  insensitive_bg_color: string;
  insensitive_fg_color: string;
  border_color: string;
}

// const hexToRawHsl = (hex: string): string => {
//   // Remove the hash if it exists
//   hex = hex.replace(/^#/, "");
//
//   // If shorthand (e.g. "03F"), expand it to "0033FF"
//   if (hex.length === 3) {
//     hex = hex
//       .split("")
//       .map((char) => char + char)
//       .join("");
//   }
//
//   // Parse the r, g, b values
//   const r = parseInt(hex.substring(0, 2), 16) / 255;
//   const g = parseInt(hex.substring(2, 4), 16) / 255;
//   const b = parseInt(hex.substring(4, 6), 16) / 255;
//
//   const max = Math.max(r, g, b);
//   const min = Math.min(r, g, b);
//   let h = 0;
//   let s = 0;
//   const l = (max + min) / 2;
//
//   if (max !== min) {
//     const d = max - min;
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//
//     switch (max) {
//       case r:
//         h = (g - b) / d + (g < b ? 6 : 0);
//         break;
//       case g:
//         h = (b - r) / d + 2;
//         break;
//       case b:
//         h = (r - g) / d + 4;
//         break;
//     }
//     h /= 6;
//   }
//
//   // Convert to degrees and percentages
//   const hDeg = Math.round(h * 360);
//   const sPct = Math.round(s * 100);
//   const lPct = Math.round(l * 100);
//
//   return `${hDeg} ${sPct}% ${lPct}%`;
// };

export default function () {
  useEffect(() => {
    async function fetchThemeColors() {
      try {
        // Вызываем Rust команду
        const colors = await invoke<GtkColors>('get_system_theme_colors');
        const r = document.documentElement;

        r.style.setProperty('--gtk-bg', colors.bg_color);
        r.style.setProperty('--gtk-fg', colors.fg_color);

        r.style.setProperty('--gtk-base', colors.base_color);
        r.style.setProperty('--gtk-text', colors.text_color);

        r.style.setProperty('--gtk-accent', colors.accent_color);
        r.style.setProperty('--gtk-accent-fg', colors.accent_fg_color);

        r.style.setProperty('--gtk-success', colors.success_color);
        r.style.setProperty('--gtk-warning', colors.warning_color);
        r.style.setProperty('--gtk-error', colors.error_color);

        r.style.setProperty('--gtk-disabled-bg', colors.insensitive_bg_color);
        r.style.setProperty('--gtk-disabled-fg', colors.insensitive_fg_color);
        r.style.setProperty('--gtk-border', colors.border_color);
      } catch (e) {
        console.error('Failed to load GTK colors:', e);
      }
    }

    fetchThemeColors();

    // (Опционально) Можно добавить слушатель изменения темы, 
    // но в Linux это сложнее, проще делать опрос или полагаться на рестарт.
  }, []);
}
