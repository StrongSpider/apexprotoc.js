export interface Vector3 {
    x: number,
    y: number,
    z: number
}

export interface Player {
    name: string,
    teamId: number,
    pos: Vector3,
    angles: Vector3,

    currentHealth: number,
    maxHealth: number,
    shieldHealth: number,
    shieldMaxHealth: number,

    nucleusHash: string,
    hardwareName: string,

    teamName: string,
    squadIndex: number,
    character: string,
    skin: string
}

export interface CustomMatch_LobbyPlayer {
    name: string,
    teamId: number,

    nucleusHash: string,
    hardwareName: string
}

export interface Datacenter {
    timestamp: number | BigInt64Array,
    category: string,

    name: string
}

export interface Version {
    major_num: number,
    minor_num: number,
    build_stamp: number,
    revision: string
}

export interface InventoryItem {
    quantity: number
    item: string

    extraData: string
}

export interface LoadoutConfiguration {
    weapons: InventoryItem[],
    equipment: InventoryItem[]
}

export enum Events {
    Init = "init",
    CustomMatch_LobbyPlayers = "customMatch_LobbyPlayers",
    ObserverSwitched = "observerSwitched",
    ObserverAnnotation = "observerAnnotation",
    MatchSetup = "matchSetup",
    GameStateChanged = "gameStateChanged",
    CharacterSelected = "characterSelected",
    MatchStateEnd = "matchStateEnd",
    RingStartClosing = "ringStartClosing",
    RingFinishedClosing = "ringFinishedClosing",
    PlayerConnected = "playerConnected",
    PlayerDisconnected = "playerDisconnected",
    PlayerStatChanged = "playerStatChanged",
    PlayerUpgradeTierChanged = "playerUpgradeTierChanged",
    PlayerDamaged = "playerDamaged",
    PlayerKilled = "playerKilled",
    PlayerDowned = "playerDowned",
    PlayerAssist = "playerAssist",
    SquadEliminated = "squadEliminated",
    GibraltarShieldAbsorbed = "gibraltarShieldAbsorbed",
    RevenantForgedShadowDamaged = "revenantForgedShadowDamaged",
    PlayerRespawnTeam = "playerRespawnTeam",
    PlayerRevive = "playerRevive",
    ArenasItemSelected = "arenasItemSelected",
    ArenasItemDeselected = "arenasItemDeselected",
    InventoryPickUp = "inventoryPickUp",
    InventoryDrop = "inventoryDrop",
    InventoryUse = "inventoryUse",
    BannerCollected = "bannerCollected",
    PlayerAbilityUsed = "playerAbilityUsed",
    LegendUpgradeSelected = "legendUpgradeSelected",
    ZiplineUsed = "ziplineUsed",
    GrenadeThrown = "grenadeThrown",
    BlackMarketAction = "blackMarketAction",
    WraithPortal = "wraithPortal",
    WarpGateUsed = "warpGateUsed",
    AmmoUsed = "ammoUsed",
    WeaponSwitched = "weaponSwitched",
    Response = "response",
    Start = "start",
    Connection = "connection",
    Disconnect = "disconnect",
}

export enum PlayerOfIntreset {
    UNSPECIFIED = 0,

	NEXT = 1,
	PREVIOUS = 2,

	KILL_LEADER = 3,
	CLOSEST_ENEMY = 4,
	CLOSEST_PLAYER = 5,
	LATEST_ATTACKER = 6
}

export interface ServerEvents {
    start: boolean,
    connection: boolean,
    disconnect: boolean,
    init: {
        timestamp: number | BigInt64Array,
        category: string,

        gameVersion: string,
        apiVersion: Version,
        platform: string,

        name: string
    };
    customMatch_LobbyPlayers: {
        playerToken: string,
        players: CustomMatch_LobbyPlayer[]
    };
    observerSwitched: {
        timestamp: number | BigInt64Array,
        category: string,

        observer: Player,
        target: Player,
        targetTeam: Player[]
    };
    observerAnnotation: {
        timestamp: number | BigInt64Array,
        category: string,

        annotationSerial: number
    };
    matchSetup: {
        timestamp: number | BigInt64Array,
        category: string,

        map: string,
        playlistName: string,
        playlistDesc: string,
        datacenter: Datacenter,
        aimAssistOn: boolean,
        anonymousMode: boolean,
        serverId: string,

        startingLoadout: LoadoutConfiguration
    };
    gameStateChanged: {
        timestamp: number | BigInt64Array,
        category: string,

        state: string
    };
    characterSelected: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player
    };
    matchStateEnd: {
        timestamp: number | BigInt64Array,
        category: string,

        state: string,
        winners: Player[]
    };
    ringStartClosing: {
        timestamp: number | BigInt64Array,
        category: string,

        stage: number,
        center: Vector3,
        currentRadius: number,
        endRadius: number,
        shrinkDuration: number
    };
    ringFinishedClosing: {
        timestamp: number | BigInt64Array,
        category: string,

        stage: number,
        center: Vector3,
        currentRadius: number,
        shrinkDuration: number
    };
    playerConnected: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player
    };
    playerDisconnected: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        canReconnect: boolean,
        isAlive: boolean
    };
    playerStatChanged: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,

        statName: string,
        newValue: number
    };
    playerUpgradeTierChanged: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        level: number
    };
    playerDamaged: {
        timestamp: number | BigInt64Array,
        category: string,

        attacker: Player,
        victim: Player,
        weapon: string,
        damageInflicted: number
    };
    playerKilled: {
        timestamp: number | BigInt64Array,
        category: string,

        attacker: Player,
        victim: Player,
        awardedTo: Player,
        weapon: string
    };
    playerDowned: {
        timestamp: number | BigInt64Array,
        category: string,

        attacker: Player,
        victim: Player,
        weapon: string
    };
    playerAssist: {
        timestamp: number | BigInt64Array,
        category: string,

        attacker: Player,
        victim: Player,
        weapon: string
    };
    squadEliminated: {
        timestamp: number | BigInt64Array,
        category: string,

        players: Player[]
    };
    gibraltarShieldAbsorbed: {
        timestamp: number | BigInt64Array,
        category: string,

        attacker: Player,
        victim: Player,
        damageInflicted: number
    };
    revenantForgedShadowDamaged: {
        timestamp: number | BigInt64Array,
        category: string,

        attacker: Player,
        victim: Player,
        damageInflicted: number
    };
    playerRespawnTeam: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        respawned: string
    };
    playerRevive: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        revived: Player
    };
    arenasItemSelected: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        item: string,
        quantity: number
    };
    arenasItemDeselected: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        item: string,
        quantity: number
    };
    inventoryPickUp: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        item: string,
        quantity: number
    };
    inventoryDrop: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        item: string,
        quantity: number,
        extraData: string[]
    };
    inventoryUse: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        item: string,
        quantity: number
    };
    bannerCollected: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        collected: Player
    };
    playerAbilityUsed: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        linkedEntity: string
    };
    legendUpgradeSelected: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        upgradeName: string,
        upgradeDesc: string,
        level: number
    };
    ziplineUsed: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        linkedEntity: string
    };
    grenadeThrown: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        linkedEntity: string
    };
    blackMarketAction: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        item: string
    };
    wraithPortal: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
    };
    warpGateUsed: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
    };
    ammoUsed: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        ammoType: string,
        amountUsed: number,
        oldAmmoCount: number,
        newAmmoCount: number
    };
    weaponSwitched: {
        timestamp: number | BigInt64Array,
        category: string,

        player: Player,
        oldWeapon: string,
        newWeapon: string
    };
    response: {
        success: boolean,
        message: any | undefined
    };
}

export interface ServerRequests {
    ChangeCamera: {
        target: PlayerOfIntreset | string
    },
    PauseToggle: {
        preTimer: number
    },
    CustomMatch_CreateLobby: {},
    CustomMatch_JoinLobby: {
        roleToken: string
    },
    CustomMatch_LeaveLobby: {},
    CustomMatch_SetReady: {
        isReady: boolean
    },
    CustomMatch_GetLobbyPlayers: {},
    CustomMatch_SetMatchmaking: {
        enabled: boolean
    },
    CustomMatch_SetTeam: {
        teamId: number,
        targetHardwareName: string,
        targetNucleusHash: string
    },
    CustomMatch_KickPlayer: {
        targetHardwareName: string,
        targetNucleusHash: string
    },
    CustomMatch_SetSettings: {
        playlistName: string,
        adminChat: boolean,
        teamRename: boolean,
        selfAssign: boolean,
        aimAssist: boolean,
        anonMode: boolean
    },
    CustomMatch_GetSettings: {},
    CustomMatch_SetTeamName: {
        teamId: number,
        teamName: string
    },
    CustomMatch_SendChat: {
        text: string
    }
}

export interface GetRequests {
    CustomMatch_GetSettings: ServerRequests['CustomMatch_SetSettings']
    CustomMatch_GetLobbyPlayers: ServerEvents['customMatch_LobbyPlayers']
}

export class Server {
    public constructor();

    public on<Event extends keyof ServerEvents>(
        event: Event,
        listener: (data: ServerEvents[Event]) => void,
    ): void;

    public once<Event extends keyof ServerEvents>(
        event: Event,
        listener: (data: ServerEvents[Event]) => void,
    ): Promise<ServerEvents[Event]>; 

    public listen(port: number): void

    public get isClosed(): boolean

    public send<Type extends keyof ServerRequests>(
        type: Type,
        message: ServerRequests[Type]
    ): void

    public get<Type extends keyof GetRequests>(
        type: Type
    ): Promise<GetRequests[Type]>;

    public destroy(): void
}