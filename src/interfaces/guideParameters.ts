
export interface GuideHistory {
    creationDate?: string | null,
    guideNr?: string | null,
    status?: string | null
};

export interface GuideItems {
    guideNr: string | null,
    source: string | null,
    destination: string | null,
    addressee: string | null,
    creationDate: string | null,
    status: string | null
};

export interface ErrorMsg {
    guideNrError?: string,
    sourceError?: string,
    destinationError?: string,
    addresseeError?: string,
    creationDateError?: string,
    statusError?: string
};

export interface StatusOrder {
    '0': number, //Status envio
    '1': number, //Pendiente
    '2': number, //En transito
    '3': number //Entregado
};

export interface StatusHistory {
    '0': string | null, //Status envio
    '1': string | null, //Pendiente
    '2': string | null, //En transito
    '3': string | null  //Entregado
};
