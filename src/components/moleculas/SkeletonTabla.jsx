import styled, { keyframes, css } from "styled-components";

export function SkeletonTabla({ rows = 6, cols = 5, rounded = false }) {
  return (
    <SkeletonWrap>
      <SkeletonHeader>
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonHeaderCell key={i} $width={i === 0 ? "40px" : "auto"} />
        ))}
      </SkeletonHeader>

      {Array.from({ length: rows }).map((_, rowIdx) => (
        <SkeletonRow key={rowIdx} $delay={`${rowIdx * 0.06}s`}>
          {Array.from({ length: cols }).map((_, colIdx) => (
            <SkeletonCell
              key={colIdx}
              $rounded={rounded}
              $circle={colIdx === 0}
              $short={colIdx === cols - 1}
            />
          ))}
        </SkeletonRow>
      ))}
    </SkeletonWrap>
  );
}

// ─── Animations ───────────────────────────────────────────────

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`;

const fadeRowIn = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const skeletonBase = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.skeletonBase || "rgba(0,0,0,0.06)"} 25%,
    ${({ theme }) => theme.skeletonShine || "rgba(0,0,0,0.12)"} 50%,
    ${({ theme }) => theme.skeletonBase || "rgba(0,0,0,0.06)"} 75%
  );
  background-size: 600px 100%;
`;

// ─── Styled Components ────────────────────────────────────────

const SkeletonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 4px 0;
`;

const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 4px 8px;
  border-bottom: 1px solid
    ${({ theme }) => theme.skeletonShine || "rgba(0,0,0,0.1)"};
`;

const SkeletonHeaderCell = styled.div`
  height: 10px;
  flex: ${({ $width }) => ($width ? `0 0 ${$width}` : "1")};
  border-radius: 99px;
  ${skeletonBase}
  animation: ${shimmer} 1.6s ease-in-out infinite;
  opacity: 0.5;
`;

const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 4px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.skeletonBase || "rgba(0,0,0,0.06)"};
  background: ${({ theme }) => theme.skeletonBase || "rgba(0,0,0,0.03)"};
  animation: ${fadeRowIn} 0.4s ${({ $delay }) => $delay || "0s"} ease both;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.skeletonShine || "rgba(0,0,0,0.06)"};
  }
`;

const SkeletonCell = styled.div`
  height: ${({ $circle }) => ($circle ? "36px" : "12px")};
  width: ${({ $circle }) => ($circle ? "36px" : "auto")};
  flex: ${({ $circle, $short }) =>
    $circle ? "0 0 36px" : $short ? "0 0 80px" : "1"};
  border-radius: ${({ $circle, $rounded }) =>
    $circle ? "50%" : $rounded ? "99px" : "6px"};
  ${skeletonBase}
  animation: ${shimmer} 1.6s ease-in-out infinite;
`;
