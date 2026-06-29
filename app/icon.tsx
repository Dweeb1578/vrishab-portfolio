import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Favicon — a warm amber orb with a charcoal monogram, echoing the spatial
// scene's palette instead of a generic black box.
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
                    color: '#16130f',
                    borderRadius: '50%',
                    backgroundImage: 'radial-gradient(circle at 35% 30%, #e9a23b, #c4703a)',
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
