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
    timestamp: number | Long,
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
    weapons: [...InventoryItem],
    equipment: [...InventoryItem]
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
        timestamp: number | Long,
        category: string,

        gameVersion: string,
        apiVersion: Version,
        platform: string,

        name: string
    };
    customMatch_LobbyPlayers: {
        playerToken: string,
        players: [...CustomMatch_LobbyPlayer]
    };
    observerSwitched: {
        timestamp: number | Long,
        category: string,

        observer: Player,
        target: Player,
        targetTeam: [...Player]
    };
    observerAnnotation: {
        timestamp: number | Long,
        category: string,

        annotationSerial: number
    };
    matchSetup: {
        timestamp: number | Long,
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
        timestamp: number | Long,
        category: string,

        state: string
    };
    characterSelected: {
        timestamp: number | Long,
        category: string,

        player: Player
    };
    matchStateEnd: {
        timestamp: number | Long,
        category: string,

        state: string,
        winners: [...Player]
    };
    ringStartClosing: {
        timestamp: number | Long,
        category: string,

        stage: number,
        center: Vector3,
        currentRadius: number,
        endRadius: number,
        shrinkDuration: number
    };
    ringFinishedClosing: {
        timestamp: number | Long,
        category: string,

        stage: number,
        center: Vector3,
        currentRadius: number,
        shrinkDuration: number
    };
    playerConnected: {
        timestamp: number | Long,
        category: string,

        player: Player
    };
    playerDisconnected: {
        timestamp: number | Long,
        category: string,

        player: Player,
        canReconnect: boolean,
        isAlive: boolean
    };
    playerStatChanged: {
        timestamp: number | Long,
        category: string,

        player: Player,

        statName: string,
        newValue: number
    };
    playerUpgradeTierChanged: {
        timestamp: number | Long,
        category: string,

        player: Player,
        level: number
    };
    playerDamaged: {
        timestamp: number | Long,
        category: string,

        attacker: Player,
        victim: Player,
        weapon: string,
        damageInflicted: number
    };
    playerKilled: {
        timestamp: number | Long,
        category: string,

        attacker: Player,
        victim: Player,
        awardedTo: Player,
        weapon: string
    };
    playerDowned: {
        timestamp: number | Long,
        category: string,

        attacker: Player,
        victim: Player,
        weapon: string
    };
    playerAssist: {
        timestamp: number | Long,
        category: string,

        attacker: Player,
        victim: Player,
        weapon: string
    };
    squadEliminated: {
        timestamp: number | Long,
        category: string,

        players: [...Player]
    };
    gibraltarShieldAbsorbed: {
        timestamp: number | Long,
        category: string,

        attacker: Player,
        victim: Player,
        damageInflicted: number
    };
    revenantForgedShadowDamaged: {
        timestamp: number | Long,
        category: string,

        attacker: Player,
        victim: Player,
        damageInflicted: number
    };
    playerRespawnTeam: {
        timestamp: number | Long,
        category: string,

        player: Player,
        respawned: string
    };
    playerRevive: {
        timestamp: number | Long,
        category: string,

        player: Player,
        revived: Player
    };
    arenasItemSelected: {
        timestamp: number | Long,
        category: string,

        player: Player,
        item: string,
        quantity: number
    };
    arenasItemDeselected: {
        timestamp: number | Long,
        category: string,

        player: Player,
        item: string,
        quantity: number
    };
    inventoryPickUp: {
        timestamp: number | Long,
        category: string,

        player: Player,
        item: string,
        quantity: number
    };
    inventoryDrop: {
        timestamp: number | Long,
        category: string,

        player: Player,
        item: string,
        quantity: number,
        extraData: [...string]
    };
    inventoryUse: {
        timestamp: number | Long,
        category: string,

        player: Player,
        item: string,
        quantity: number
    };
    bannerCollected: {
        timestamp: number | Long,
        category: string,

        player: Player,
        collected: Player
    };
    playerAbilityUsed: {
        timestamp: number | Long,
        category: string,

        player: Player,
        linkedEntity: string
    };
    legendUpgradeSelected: {
        timestamp: number | Long,
        category: string,

        player: Player,
        upgradeName: string,
        upgradeDesc: string,
        level: number
    };
    ziplineUsed: {
        timestamp: number | Long,
        category: string,

        player: Player,
        linkedEntity: string
    };
    grenadeThrown: {
        timestamp: number | Long,
        category: string,

        player: Player,
        linkedEntity: string
    };
    blackMarketAction: {
        timestamp: number | Long,
        category: string,

        player: Player,
        item: string
    };
    wraithPortal: {
        timestamp: number | Long,
        category: string,

        player: Player,
    };
    warpGateUsed: {
        timestamp: number | Long,
        category: string,

        player: Player,
    };
    ammoUsed: {
        timestamp: number | Long,
        category: string,

        player: Player,
        ammoType: string,
        amountUsed: number,
        oldAmmoCount: number,
        newAmmoCount: number
    };
    weaponSwitched: {
        timestamp: number | Long,
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

    public get isClosed():boolean

    public send<Type extends keyof ServerRequests>(
        type: Type,
        message: ServerRequests[Type]
    ): void

    public destroy(): void
}