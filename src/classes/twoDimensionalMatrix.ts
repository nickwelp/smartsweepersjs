import Vector2d from "./vector2d";


class TwoDimensionalMatrix {
    _11!: number;
    _12!: number;
    _13!: number;
    _21!: number;
    _22!: number;
    _23!: number;
    _31!: number;
    _32!: number;
    _33!: number;

    constructor() {
        this._11 = 0;
        this._12 = 0;
        this._13 = 0;
        this._21 = 0;
        this._22 = 0;
        this._23 = 0;
        this._31 = 0;
        this._32 = 0;
        this._33 = 0;
    }

    private consumeMatrix(mIn: TwoDimensionalMatrix): void {
        console.log(mIn._11, mIn._12, mIn._13, mIn._21, mIn._22, mIn._23, mIn._31, mIn._32, mIn._33)
        this._11 = mIn._11;
        this._12 = mIn._12;
        this._13 = mIn._13;
        this._21 = mIn._21;
        this._22 = mIn._22;
        this._23 = mIn._23;
        this._31 = mIn._31;
        this._32 = mIn._32;
        this._33 = mIn._33;
        console.log(this._11, this._12, this._13, this._21, this._22, this._23, this._31, this._32, this._33);

    }

    public TwoDimensionalMatrixMultiply(mIn: TwoDimensionalMatrix): void {
        const mat_temp = new TwoDimensionalMatrix();
        mat_temp._11 = (this._11 * mIn._11) + (this._12 * mIn._21) + (this._13 * mIn._31);
        mat_temp._12 = (this._11 * mIn._12) + (this._12 * mIn._22) + (this._13 * mIn._32);
        mat_temp._13 = (this._11 * mIn._13) + (this._12 * mIn._23) + (this._13 * mIn._33);
        mat_temp._21 = (this._21 * mIn._11) + (this._22 * mIn._21) + (this._23 * mIn._31);
        mat_temp._22 = (this._21 * mIn._12) + (this._22 * mIn._22) + (this._23 * mIn._32);
        mat_temp._23 = (this._21 * mIn._13) + (this._22 * mIn._23) + (this._23 * mIn._33);
        mat_temp._31 = (this._31 * mIn._11) + (this._32 * mIn._21) + (this._33 * mIn._31);
        mat_temp._32 = (this._31 * mIn._12) + (this._32 * mIn._22) + (this._33 * mIn._32);
        mat_temp._33 = (this._31 * mIn._13) + (this._32 * mIn._23) + (this._33 * mIn._33);
        this.consumeMatrix(mat_temp);
    }

    public createIdentity(): TwoDimensionalMatrix {
        let matrix = new TwoDimensionalMatrix();
        matrix._11 = 1;
        matrix._22 = 1;
        matrix._33 = 1;
        matrix._12 = 0;
        matrix._13 = 0;
        matrix._21 = 0;
        matrix._23 = 0;
        matrix._31 = 0;
        matrix._32 = 0;
        return matrix;
    }
    public translate(x: number, y: number): void {
        let matrix = this.createIdentity();
        matrix._31 = x;
        matrix._32 = y;
        this.TwoDimensionalMatrixMultiply(matrix);
    }

    public scale(xScale: number, yScale: number): void {
        let matrix = this.createIdentity();
        matrix._11 = xScale;
        matrix._22 = yScale;
        this.TwoDimensionalMatrixMultiply(matrix);
    }

    public rotate(angle: number): void {
        let matrix = this.createIdentity();
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        matrix._11 = cos;
        matrix._12 = sin;
        matrix._21 = -sin;
        matrix._22 = cos;
        this.TwoDimensionalMatrixMultiply(matrix);
    }

    public transformPoints(points: Vector2d[]): Vector2d[] {
        const tempPoints: Vector2d[] = [];
        console.log(this._11, this._12, this._13, this._21, this._22, this._23, this._31, this._32, this._33);
        for (let i = 0; i < points.length; i++) {
            let tempX = (this._11 * points[i].x) + (this._21 * points[i].y) + (this._31);
            let tempY = (this._12 * points[i].x) + (this._22 * points[i].y) + (this._32);
            tempPoints.push(new Vector2d(tempX, tempY));
        }
        return tempPoints;
    }
};

export default TwoDimensionalMatrix;