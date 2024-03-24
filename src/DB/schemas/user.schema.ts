import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";






@Schema({ timestamps: true })
export class User {
    @Prop(
        {
            type: String,
            required: true
        }
    )
    name: string;
    @Prop(
        {
            type: String,
            required: true,
            unique: true
        }
    )
    email: string;
    @Prop(
        {
            type: String,
            required: true
        }
    )
    password: string;
    @Prop(
        {
            type: Boolean,
            default: false,
            required: true
        }
    )
    isVerified: boolean;

}

export const userSchema = SchemaFactory.createForClass(User)