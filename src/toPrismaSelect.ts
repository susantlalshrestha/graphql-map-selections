const toPrismaSelect = (mappedSelection: Record<string, boolean | any>) => {
    const prismaSelect = mappedSelection;
    Object.keys(mappedSelection).forEach((s) => {
        if (typeof prismaSelect[s] === "object") prismaSelect[s] = toPrismaSelect(prismaSelect[s]);
    });
    return { select: prismaSelect };
};

export default toPrismaSelect;
