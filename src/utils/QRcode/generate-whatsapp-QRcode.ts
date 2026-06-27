import QRCode from "qrcode";

let currentQRImage: string | null = null;

export async function generateQRCodePayload(qr: string): Promise<void> {
  currentQRImage = await QRCode.toDataURL(qr);
}

export function getCurrentQRImage(): string | null {
  return currentQRImage;
}

export function clearQR(): void {
  currentQRImage = null;
}
