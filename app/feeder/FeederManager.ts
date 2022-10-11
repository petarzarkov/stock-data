import { FeederFactory, IFeedOptions } from "./FeederFactory";

class FeederManager {
    factories: Record<string, FeederFactory>;
    factoryValues: FeederFactory[];

    constructor(feeds?: IFeedOptions[]) {
        this.factories = {};
        const feeders = feeds || [
            { opts: { url: "https://opentdb.com/api.php?amount=50", resultKey: "results" } },
            { opts: { url: "https://the-trivia-api.com/questions?limit=20" }, numberOfFeeders: 7 }
        ];

        for (const feed of feeders) {
            this.factories[feed.opts.url] = new FeederFactory({ opts: feed.opts, numberOfFeeders: feed.numberOfFeeders });
        }

        this.factoryValues = Object.values(this.factories);
    }

    get areRunning() {
        return this.factoryValues.every(f => f.isRunning);
    }

    public startAll = () => {
        for (const f of this.factoryValues) {
            f.start();
        }
    };

    public stopAll = () => {
        for (const f of this.factoryValues) {
            f.stop();
        }
    };
}

export const FeedsMgr = new FeederManager();