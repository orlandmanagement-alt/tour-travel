// Helper to generate a random 16-byte salt (hex encoded)
export function generateSalt(): string {
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);
  return Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Convert string to ArrayBuffer safely
function getBuffer(text: string): ArrayBuffer {
  return new TextEncoder().encode(text).buffer;
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64UrlToString(base64url: string): string {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  // Pad the base64 string
  const pad = base64.length % 4;
  const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
  return atob(padded);
}

// Hash password with salt using Native Web Crypto API
export async function hashPassword(password: string, salt: string): Promise<string> {
  const encodedData = getBuffer(`${password}${salt}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Verify if provided password matches the stored hash
export async function verifyPassword(password: string, salt: string, storedHash: string): Promise<boolean> {
  const hash = await hashPassword(password, salt);
  return hash === storedHash;
}

// Sign JWT token manually using Web Crypto
export async function signJWT(payload: any, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = arrayBufferToBase64Url(getBuffer(JSON.stringify(header)));
  const encodedPayload = arrayBufferToBase64Url(getBuffer(JSON.stringify(payload)));
  
  const tokenData = `${encodedHeader}.${encodedPayload}`;
  
  const key = await crypto.subtle.importKey(
    'raw',
    getBuffer(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, getBuffer(tokenData));
  const signature = arrayBufferToBase64Url(signatureBuffer);
  
  return `${tokenData}.${signature}`;
}

// Verify JWT token and return payload manually
export async function verifyJWT(token: string, secret: string): Promise<any> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const tokenData = `${parts[0]}.${parts[1]}`;
    const providedSignature = parts[2];
    
    const key = await crypto.subtle.importKey(
      'raw',
      getBuffer(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const stringToBase64UrlBuffer = (b64u: string) => {
      const b64 = b64u.replace(/-/g, '+').replace(/_/g, '/');
      const pad = b64.length % 4;
      const padded = pad ? b64 + '='.repeat(4 - pad) : b64;
      const binary = atob(padded);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes.buffer;
    };
    
    const signatureBuffer = stringToBase64UrlBuffer(providedSignature);
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      getBuffer(tokenData)
    );
    
    if (!isValid) return null;
    
    const payloadStr = base64UrlToString(parts[1]);
    const payload = JSON.parse(payloadStr);
    
    // Check expiry if exists
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    
    return payload;
  } catch (e) {
    return null;
  }
}
