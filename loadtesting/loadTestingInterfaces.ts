


export interface loadTestingStats {
    totalRuntime: number,
    errors: number,
    averageResponseTime: number,
    minResponseTime: number,
    maxResponseTime: number,
    medianResponseTime: number,
    p95ResponseTime: number,
    p99ResponseTime: number,
    totalRequests: number
}

export function createBaseLoadTestingStats(){
     return {
        totalRuntime: 0, // measured in milliseconds
        errors: 0,
        averageResponseTime: 0,
        minResponseTime: 0,
        maxResponseTime: 0,
        totalRequests: 0,
        medianResponseTime: 0,
        p95ResponseTime: 0,
        p99ResponseTime: 0
    }
}

export function calculateStats(runtimes: number[], stats: loadTestingStats): loadTestingStats{
    runtimes.sort((a, b) => a - b);
    
    stats.averageResponseTime = runtimes.reduce((a, b) => a + b, 0) / runtimes.length;
    stats.minResponseTime = Math.min(...runtimes);
    stats.maxResponseTime = Math.max(...runtimes);
    stats.totalRuntime = runtimes.reduce((a, b) => a + b, 0);
    stats.medianResponseTime = runtimes[Math.floor(runtimes.length/2)];
    stats.p95ResponseTime = runtimes[Math.floor(runtimes.length * 0.95)];
    stats.p99ResponseTime = runtimes[Math.floor(runtimes.length * 0.99)];

    return stats;
}