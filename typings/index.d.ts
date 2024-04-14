// Intermediary messages:
// Not used directly, but as part of other messages

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

// Events that may be sent by client
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
    LiveAPIEvent = "liveAPIEvent"
}

// Enum used to quickly described the target of a ChangeCamera operation
export enum PlayerOfIntreset {
    UNSPECIFIED = 0,

    // Cycle through known Players in a team
    NEXT = 1,
    PREVIOUS = 2,

    // Go to an interesting player
    KILL_LEADER = 3,
    CLOSEST_ENEMY = 4,
    CLOSEST_PLAYER = 5,
    LATEST_ATTACKER = 6
}

// Messages able to be emited
export interface ServerEvents {
    // Websocket util events
    start: boolean,
    connection: boolean,
    disconnect: boolean,

    // Output messages:
    // Game events that describe the ongoing state of the match
    // Every message will have a timestamp and category 

    init: {
        timestamp: number | BigInt64Array,
        category: string,

        gameVersion: string,
        apiVersion: Version,
        platform: string,

        // Named specified by `cl_liveapi_session_name`
        name: string
    };

    customMatch_LobbyPlayers: {
        playerToken: string,
        players: CustomMatch_LobbyPlayer[]
    };

    // Observer Events

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

    // Match Information

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

    // Combat events

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

    // Interaction events

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

    // Encoded events

    liveAPIEvent: any;

    response: {
        success: boolean,
        message: any | undefined
    };
}

// Input messages:
// Used by observers to programmatically interact with the game
export interface ServerRequests {
    ChangeCamera: {
        // If POI: Set the camera to an interesting player (e.g. the Kill Leader)
        // If Name: Change camera to a player by name
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

// Requests with message responses
export interface GetRequests {
    CustomMatch_GetSettings: ServerRequests['CustomMatch_SetSettings']
    CustomMatch_GetLobbyPlayers: ServerEvents['customMatch_LobbyPlayers']
}

/**
 * Websocket Server from `apexprotoc.js`
 * @example 
 * const Server = new apexprotoc.Server(); 
 */
export class Server {
    public constructor();

    /**
     * Event listener for "ServerEvents" from the Apex Legends client
     * @argument event Server event to listen for
     * @argument listener Function called when server event fires
     * @example 
     * Server.on('gameStateChanged', (gameStateData) => {
     *  console.log(gameStateData)
     * })
     */
    public on<Event extends keyof ServerEvents>(
        event: Event,
        listener: (data: ServerEvents[Event]) => void,
    ): void;

    /**
     * One time event listener for "ServerEvents" from the Apex Legends client
     * @argument event Server event to listen for
     * @argument listener Function called when server event fires (only called once)
     * @returns Data from event
     * @example 
     * Server.once('connection', () => {
     *  console.log("Client connected!")
     * })
     */
    public once<Event extends keyof ServerEvents>(
        event: Event,
        listener: (data: ServerEvents[Event]) => void,
    ): Promise<ServerEvents[Event]>;

    /**
     * Sets up websocket server on a port and relays events back through the `Server` object
     * @argument port The port entered in LiveAPI configerations `DEFAULT: 7777`
     * @example 
     * Server.listen(7777);
     */
    public listen(port: number): void

    /**
     * Checks the websocket for an active connection with the Apex Client
     * @returns True or False active connection
     */
    public get isClosed(): boolean

    /**
     * Sends Request through websocket to serve to Apex client
     * 
     * NOTE: Apex client will send a 'response' event in acknowledgement
     * @argument type Server Request type
     * @argument message Request message object
     * @example 
     * Server.send('CustomMatch_SendChat', { text: "glhf!" });
     */
    public send<Type extends keyof ServerRequests>(
        type: Type,
        message?: ServerRequests[Type]
    ): void

    /**
     * Gets information from apex client
     * 
     * NOTE: If you use Server Request instead of Get Request you will return acknowledgement
     * 
     * **WARNING**: Will yeild until responce from Apex client 
     * @argument type Get Request type
     * @yields
     * @example 
     * const GetLobby = await Server.get('CustomMatch_GetLobbyPlayers');
     */
    public get<Type extends keyof GetRequests>(
        type: Type
    ): Promise<GetRequests[Type]>;

    /**
     * Server destructor
     */
    public destroy(): void
}