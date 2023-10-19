export const lazyRouter = async (src: Promise<{ readonly default: any }>) => {
    const resource = await src
    return {Component: resource.default}
}