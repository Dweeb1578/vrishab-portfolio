import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Vrishab Nair, GTM Engineer and AI builder';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

// Warm, on-brand share card — matches the spatial scene's charcoal/amber palette
// (deliberately NOT the cold blue gradient that read as generic AI slop). A few
// glowing "orbs" echo the portfolio itself.
export default async function Image() {
    const orb = (
        x: number,
        y: number,
        d: number,
        c: string,
    ): React.CSSProperties => ({
        position: 'absolute',
        left: x,
        top: y,
        width: d,
        height: d,
        borderRadius: '50%',
        backgroundImage: `radial-gradient(circle at 38% 32%, ${c}, ${c}00 70%)`,
    });

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#16130f',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* warm center glow */}
                <div
                    style={{
                        position: 'absolute',
                        width: 900,
                        height: 900,
                        borderRadius: '50%',
                        backgroundImage:
                            'radial-gradient(circle, rgba(233,162,59,0.20), rgba(22,19,15,0) 60%)',
                    }}
                />

                {/* scattered orbs */}
                <div style={orb(120, 90, 150, '#e9a23b')} />
                <div style={orb(980, 130, 110, '#d8623a')} />
                <div style={orb(150, 430, 120, '#a8a06a')} />
                <div style={orb(1000, 440, 140, '#c4703a')} />

                {/* name in the warm gradient */}
                <div
                    style={{
                        display: 'flex',
                        backgroundImage: 'linear-gradient(90deg, #e9a23b, #d8623a)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        fontSize: 92,
                        fontWeight: 900,
                        letterSpacing: '-2px',
                    }}
                >
                    VRISHAB NAIR
                </div>

                {/* positioning */}
                <div style={{ display: 'flex', fontSize: 34, color: '#f3ead7', marginTop: 16 }}>
                    GTM Engineer · builds AI tooling & automation
                </div>

                <div style={{ display: 'flex', fontSize: 24, color: '#a8a06a', marginTop: 28 }}>
                    an interactive spatial portfolio · ask it anything
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 44,
                        display: 'flex',
                        fontSize: 20,
                        color: '#6b5f4a',
                    }}
                >
                    vrishab-portfolio.vercel.app
                </div>
            </div>
        ),
        { ...size },
    );
}
