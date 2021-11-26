import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExperimentalConfigDocument = ExperimentalConfig & Document;

@Schema({ collection: 'nucleus_experimental_config' })
export class ExperimentalConfig {
    @Prop()
    is_active: boolean;

    @Prop()
    module_name: string;

    @Prop([Number])
    schools_applicable: number[];
}

export const ExperimentalConfigSchema = SchemaFactory.createForClass(ExperimentalConfig);
