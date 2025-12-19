import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Vrishab Nair - Portfolio';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 60,
                    background: '#020617', // slate-950
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    border: '20px solid #1e293b', // slate-800 border
                }}
            >
                {/* Name with Gradient Effect */}
                <div
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #60a5fa, #34d399)', // blue-400 to emerald-400
                        backgroundClip: 'text',
                        color: 'transparent', // Make text transparent to show gradient
                        fontSize: 80,
                        fontWeight: '900',
                        marginBottom: 20,
                        letterSpacing: '-2px',
                    }}
                >
                    VRISHAB NAIR
                </div>

                {/* Subtitle */}
                <div style={{ fontSize: 32, color: '#94a3b8', marginTop: 10 }}>
                    Product • Engineering • Strategy
                </div>

                {/* URL at bottom */}
                <div style={{ position: 'absolute', bottom: 40, fontSize: 20, color: '#475569' }}>
                    vrishab-portfolio.vercel.app
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}