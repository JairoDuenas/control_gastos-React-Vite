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
      <Blob className="blob-three" />
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
    background: radial-gradient(
      circle,
      rgba(155, 109, 255, 0.14) 0%,
      transparent 70%
    );
  }
  &.blob-two {
    bottom: -160px;
    right: -80px;
    width: 420px;
    height: 420px;
    background: radial-gradient(
      circle,
      rgba(56, 189, 248, 0.1) 0%,
      transparent 70%
    );
  }
  &.blob-three {
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(26, 107, 69, 0.07) 0%,
      transparent 70%
    );
  }

  @media (max-width: 480px) {
    padding: 14px;
    padding-bottom: 40px;
  }
`;
