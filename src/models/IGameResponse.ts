export interface IGameResponse {
    id: string;
    state: string;
    date: Date;
    redScore: number;
    blueScore: number;
    replayId: string | null;
    hasReplayFragments: boolean;
    players: IGamePlayerResponse[]
    chatMessages: IGameChatResponse[]
    goals: IGameGoalResponse[]
}

export interface IGamePlayerResponse {
    id: number;
    name: string;
    goals: number;
    assists: number;
    score: number;
    team: number;
}

export interface IGameChatResponse {
    id: string;
    packet: number;
    text: string;
}

export interface IGameGoalResponse {
    id: string;
    packet: number;
    goalBy: string;
    period: number;
    time: number;
}