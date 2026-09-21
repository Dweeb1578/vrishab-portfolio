import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Favicon: a phosphor orb with a near-black monogram, echoing the scene's
// palette instead of a generic black box.
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 19,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#040a06',
                    borderRadius: '50%',
                    backgroundImage: 'radial-gradient(circle at 35% 30%, #39ff6a, #0f7a2e)',
                    fontFamily: 'sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-1px',
                }}
            >
                VN
            </div>
        ),
        {
            ...size,
        }
    )
}
