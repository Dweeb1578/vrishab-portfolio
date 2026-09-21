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
                    background: '#040a06',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* phosphor center glow */}
                <div
                    style={{
                        position: 'absolute',
                        width: 900,
                        height: 900,
                        borderRadius: '50%',
                        backgroundImage:
                            'radial-gradient(circle, rgba(57,255,106,0.18), rgba(4,10,6,0) 60%)',
                    }}
                />

                {/* scattered orbs */}
                <div style={orb(120, 90, 150, '#39ff6a')} />
                <div style={orb(980, 130, 110, '#00b341')} />
                <div style={orb(150, 430, 120, '#8cff9e')} />
                <div style={orb(1000, 440, 140, '#17a83f')} />

                {/* name in phosphor */}
                <div
                    style={{
                        display: 'flex',
                        color: '#39ff6a',
                        fontSize: 92,
                        fontWeight: 900,
                        letterSpacing: '-2px',
                    }}
                >
                    VRISHAB NAIR
                </div>

                {/* positioning */}
                <div style={{ display: 'flex', fontSize: 34, color: '#cdf6d6', marginTop: 16 }}>
                    GTM Engineer · builds AI tooling & automation
                </div>

                <div style={{ display: 'flex', fontSize: 24, color: '#4f9c63', marginTop: 28 }}>
                    an interactive spatial portfolio · ask it anything
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 44,
                        display: 'flex',
                        fontSize: 20,
                        color: '#35704a',
                    }}
                >
                    vrishab-portfolio.vercel.app
                </div>
            </div>
        ),
        { ...size },
    );
}
