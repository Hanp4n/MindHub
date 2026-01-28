import { Page, Text, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../icons/klLogoPng.png'
import ReactPDFChart from "react-pdf-charts";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar, Legend, Tooltip } from 'recharts';
import { TareaData, TiempoUsoData, TiempoUsoLeerEscribirHablar, TiempoUsoMedioLeerEscribirHablar } from '../MindHubTabs/Rendimiento';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF'
    },

    /* HEADER */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 10
    },

    logo: {
        width: 32,
        height: 32
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1F2937'
    },

    subtitle: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 20
    },

    /* TEXTOS */
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#111827',
        marginTop: 20,
        marginBottom: 8
    },

    text: {
        fontSize: 11,
        color: '#374151',
        marginBottom: 4,
        lineHeight: 1.4
    },

    bullet: {
        fontSize: 11,
        marginLeft: 6
    },

    /* TABLA */
    table: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginTop: 10,
        borderRadius: 4
    },

    tableRowHeader: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderBottomWidth: 1,
        borderColor: '#E5E7EB'
    },

    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E5E7EB'
    },

    tableCol: {
        width: '33.33%',
        padding: 6
    },

    tableHeaderText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#111827'
    },

    tableCellText: {
        fontSize: 10,
        color: '#374151'
    },

    /* GRÁFICOS */
    chartContainer: {
        marginTop: 15,
        alignItems: 'center'
    },

    chart: {
        width: '100%'
    },

    /* FOOTER */
    footer: {
        alignItems: 'flex-end'
    },

    pageNumber: {
        fontSize: 9,
        color: '#6B7280'
    }
});


export type InformeRendimientoProps = {
    mes: string
    anio: string
    tareas: TareaData[]
    tiempoUso: TiempoUsoLeerEscribirHablar[]
    tiempoUsoMedio: TiempoUsoMedioLeerEscribirHablar
}

// Colores para el Pie Chart
const COLORS = ['#00C49F', '#FF8042'];

export default function InformeRendimiento({ mes, anio, tareas, tiempoUso, tiempoUsoMedio }: InformeRendimientoProps) {

    const porcentajeExito = () => {
        const vencidas = tareas.filter(tarea => !tarea.completada).length;
        const realizadas = tareas.filter(tarea => tarea.completada).length;
        const total = vencidas + realizadas;

        return total > 0 ? ((realizadas * 100) / total).toFixed(1) : 0;
    }

    // Datos para el Pie Chart
    const dataPieChart = [
        {
            name: 'Realizadas',
            value: tareas.filter(tarea => tarea.completada).length
        },
        {
            name: 'Vencidas',
            value: tareas.filter(tarea => !tarea.completada).length
        }
    ];

    // Datos para el Bar Chart (tiempo de uso medio)
    const dataBarChart = [
        { actividad: 'Leer', tiempo: tiempoUsoMedio.leer },
        { actividad: 'Escribir', tiempo: tiempoUsoMedio.escribir },
        { actividad: 'Hablar', tiempo: tiempoUsoMedio.hablar }
    ];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <div>
                    <div style={styles.header}>
                        <Image src={logo} style={styles.logo} />
                        <Text style={styles.title}>KoroLang</Text>
                    </div>
                    <Text style={styles.subtitle}>Informe de {mes} de {anio}</Text>


                    <Text style={styles.text}>Informe de {mes} de {anio}</Text>

                    <Text style={{ ...styles.text, marginTop: 20, fontWeight: 'bold' }}>Tareas</Text>

                    <div style={styles.table}>
                        <div style={styles.tableRowHeader}>
                            <div style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Nombre</Text>
                            </div>
                            <div style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Tipo</Text>
                            </div>
                            <div style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Fecha</Text>
                            </div>
                        </div>

                        {tareas.map((tarea, index) => (
                            <div key={index} style={styles.tableRow}>
                                <div style={styles.tableCol}>
                                    <Text style={styles.tableCellText}>{tarea.nombre}</Text>
                                </div>
                                <div style={styles.tableCol}>
                                    <Text style={styles.tableCellText}>{tarea.tipo}</Text>
                                </div>
                                <div style={styles.tableCol}>
                                    <Text style={styles.tableCellText}>
                                        {new Date(tarea.fecha_entrega).toLocaleDateString()}
                                    </Text>
                                </div>
                            </div>
                        ))}
                    </div>


                    <Text style={{ ...styles.text, marginTop: 20, fontWeight: 'bold' }}>Trabajo realizado</Text>

                    <Text style={styles.text}>• Tareas vencidas: {tareas.filter(tarea => !tarea.completada).length}</Text>
                    <Text style={styles.text}>• Tareas realizadas: {tareas.filter(tarea => tarea.completada).length}</Text>
                    <Text style={styles.text}>• Porcentaje de éxito: {porcentajeExito()}%</Text>

                    {/* Pie Chart */}
                    <ReactPDFChart style={styles.chart}>
                        <PieChart width={400} height={250}>
                            <Pie
                                data={dataPieChart}
                                cx={200}
                                cy={125}
                                labelLine={false}

                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                isAnimationActive={false}
                            >
                                {dataPieChart.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ReactPDFChart>
                </div>
                <div style={styles.footer}>
                    <Text style={styles.pageNumber}>1/2</Text>
                </div>

            </Page>

            <Page size="A4" style={styles.page}>
                <div>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>Tiempo de uso diario</Text>

                    <ReactPDFChart style={styles.chart}>
                        <LineChart data={tiempoUso} height={250} width={500}>
                            <XAxis dataKey="dia" label={{ value: 'Día del mes', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Minutos', angle: -90, position: 'insideLeft' }} />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <Line
                                isAnimationActive={false}
                                type="monotone"
                                dataKey="leer"
                                stroke="#8884d8"
                                name="Leer"
                                strokeWidth={2}
                            />
                            <Line
                                isAnimationActive={false}
                                type="monotone"
                                dataKey="escribir"
                                stroke="#82ca9d"
                                name="Escribir"
                                strokeWidth={2}
                            />
                            <Line
                                isAnimationActive={false}
                                type="monotone"
                                dataKey="hablar"
                                stroke="#ffc658"
                                name="Hablar"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ReactPDFChart>

                    {/* <Text style={{...styles.text, marginTop: 20, fontWeight: 'bold'}}>Tiempo de uso medio</Text> */}

                    {/* Bar Chart */}
                    <ReactPDFChart style={styles.chart}>
                        <BarChart width={500} height={250} data={dataBarChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="actividad" />
                            <YAxis label={{ value: 'Minutos promedio', angle: -90, position: 'insideLeft' }} />
                            <Bar
                                dataKey="tiempo"
                                fill="#8884d8"
                                name="Tiempo (min)"
                                isAnimationActive={false}
                            >
                                {dataBarChart.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === 0 ? '#8884d8' : index === 1 ? '#82ca9d' : '#ffc658'}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ReactPDFChart>

                    {/* Resumen numérico */}
                    <Text style={{ ...styles.text, marginTop: 10 }}>
                        Promedio Leer: {tiempoUsoMedio.leer} horas
                    </Text>
                    <Text style={styles.text}>
                        Promedio Escribir: {tiempoUsoMedio.escribir} horas
                    </Text>
                    <Text style={styles.text}>
                        Promedio Hablar: {tiempoUsoMedio.hablar} horas
                    </Text>
                </div>
                <div style={styles.footer}>
                    <Text style={styles.pageNumber}>1/2</Text>
                </div>

            </Page>
        </Document>
    );
}