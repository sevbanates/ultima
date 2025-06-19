export class SelectTextModel {
    Value: string;
    Text: string;
}

export class SelectNumberModel {
    Value: number;
    Text: string;
}

export class SelectNumberModelWithGuid extends SelectNumberModel {
    GuidId: string;
}

export class SelectNumberModel2 {
    Value: number;
    Text: string;
    Color?: string;
}

export class SelectBooleanModel {
    Value: boolean;
    Text: string;
}
