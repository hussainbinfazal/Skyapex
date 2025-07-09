import mongoose, { Document, Schema } from "mongoose";

export interface IDeed extends Document {
  readonly _id: string;
  fullName: string;
  fatherName: string;
  propertySize: number;
  saleAmount: number;
}
const deedSchema = new Schema<IDeed>(
  {
    fullName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    propertySize: {
      type: Number,
      required: true,
    },
    saleAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Deed = mongoose.models.Deed || mongoose.model<IDeed>("Deed", deedSchema);

export { Deed, deedSchema };
export default Deed;
