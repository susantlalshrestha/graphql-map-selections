const toPrismaSelect = <T>(
  mappedSelection: Record<string, boolean | any>
): Record<"select", T> => {
  if (!mappedSelection) return;
  const prismaSelect = mappedSelection;
  Object.keys(mappedSelection).forEach((s) => {
    if (typeof prismaSelect[s] === "object")
      prismaSelect[s] = toPrismaSelect(prismaSelect[s]);
  });
  return { select: prismaSelect as T };
};

export default toPrismaSelect;
