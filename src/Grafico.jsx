import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// eslint-disable-next-line react/prop-types
const Grafico = ({ dataGrafico }) => {
    return (
        <div style={{ width: "100%", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataGrafico} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="intencidad" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="pies" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Grafico;