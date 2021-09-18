export type PrismaSelect<T> = Record<"select", T>;

const toPrismaSelect = <T>(mappedSelection: Record<string, boolean | any>) => {
  if (!mappedSelection) return;
  const prismaSelect = mappedSelection;
  Object.keys(mappedSelection).forEach((s) => {
    if (typeof prismaSelect[s] === "object")
      prismaSelect[s] = toPrismaSelect(prismaSelect[s]);
  });
  return { select: prismaSelect } as PrismaSelect<T>;
};

export default toPrismaSelect;
