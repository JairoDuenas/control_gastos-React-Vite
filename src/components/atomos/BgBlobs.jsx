import styled from "styled-components";

/**
 * BgBlobs
 * Blobs ambientales decorativos de fondo.
 * Se usan en todos los templates para dar profundidad visual.
 */
export function BgBlobs() {
  return (
    <>
      <Blob className="blob-one" />
      <Blob className="blob-two" />
    </>
  );
}

const Blob = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
  z-index: 0;

  &.blob-one {
    top: -180px;
    left: -120px;
    background: radial-gradient(circle, rgba(155, 109, 255, 0.14) 0%, transparent 70%);
  }
  &.blob-two {
    bottom: -160px;
    right: -80px;
    width: 420px;
    height: 420px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.10) 0%, transparent 70%);
  }
`;
