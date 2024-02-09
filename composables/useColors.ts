export const useColors = () => {
  function getLineColor(line: number): string {
    const colors = new Map();
    colors.set(1, '#1d4ed8');
    colors.set(2, '#b91c1c');
    colors.set(3, '#059669');
    colors.set(4, '#f59e0b');
    colors.set(5, '#7c3aed');
    colors.set(6, '#ef4444');
    colors.set(7, '#3b82f6');
    colors.set(8, '#10b981');
    return colors.get(line);
  }

  return { getLineColor };
};
