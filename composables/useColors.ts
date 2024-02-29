export const useColors = () => {
  function getLineColor(line: number): string {
    const colors = new Map();
    colors.set(1, '#a95cdd');
    colors.set(2, '#cc2b38');
    colors.set(3, '#e7991e');
    colors.set(4, '#0071b4');
    colors.set(5, '#6503b2');
    colors.set(6, '#1a958f');
    colors.set(7, '#77bd17');
    colors.set(8, '#b46913');
    return colors.get(line);
  }

  return { getLineColor };
};
