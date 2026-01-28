import { Page, Text, Document, StyleSheet, Image, View } from '@react-pdf/renderer';
import logo from '../icons/klLogoPng.png'
import ReactPDFChart from "react-pdf-charts";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TareaData, TiempoUsoData, TiempoUsoLeerEscribirHablar, TiempoUsoMedioLeerEscribirHablar, TipoTareaData } from '../MindHubTabs/Rendimiento';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF'
    },

    /* HEADER */
    header: {
        flexDirection: 'row-reverse',
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
        textAlign: 'right',
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
        borderColor: '#E5E7EB',
    },

    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },

    tableCol: {
        width: '33.33%',
        padding: 6
    },

    tableCol4: {
        width: '25%',
        padding: 6
    },

    tableHeaderText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#111827'
    },

    tableCellText: {
        fontSize: 10,
        color: '#374151',
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
        position: 'absolute',
        bottom: 30,
        right: 30,
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
    tipoTareas: TipoTareaData
    tiempoUso: TiempoUsoLeerEscribirHablar[]
    tiempoUsoMedio: TiempoUsoMedioLeerEscribirHablar
}

// Función para convertir número de mes a nombre
const obtenerNombreMes = (mes: string): string => {
    const numeroMes = parseInt(mes, 10);
    
    switch (numeroMes) {
        case 1: return 'Enero';
        case 2: return 'Febrero';
        case 3: return 'Marzo';
        case 4: return 'Abril';
        case 5: return 'Mayo';
        case 6: return 'Junio';
        case 7: return 'Julio';
        case 8: return 'Agosto';
        case 9: return 'Septiembre';
        case 10: return 'Octubre';
        case 11: return 'Noviembre';
        case 12: return 'Diciembre';
        default: return mes; 
    }
};

const COLORS = ['#00C49F', '#FF8042'];

const FILAS_POR_PAGINA_TAREAS = 15;
const FILAS_POR_PAGINA_TIEMPO_USO = 20;

export default function InformeRendimiento({ mes, anio, tareas, tiempoUso, tiempoUsoMedio, tipoTareas }: InformeRendimientoProps) {

    const porcentajeExito = () => {
        const vencidas = tareas.filter(tarea => !tarea.completada).length;
        const realizadas = tareas.filter(tarea => tarea.completada).length;
        const total = vencidas + realizadas;

        return total > 0 ? ((realizadas * 100) / total).toFixed(1) : 0;
    }

    const dividirEnChunks = <T,>(array: T[], tamanoChunk: number): T[][] => {
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += tamanoChunk) {
            chunks.push(array.slice(i, i + tamanoChunk));
        }
        return chunks;
    };

    const tareasPaginadas = dividirEnChunks(tareas, FILAS_POR_PAGINA_TAREAS);
    
    const tiempoUsoPaginado = dividirEnChunks(tiempoUso, FILAS_POR_PAGINA_TIEMPO_USO);

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

    const dataBarChart = [
        { actividad: 'Leer', tiempo: tiempoUsoMedio.leer },
        { actividad: 'Escribir', tiempo: tiempoUsoMedio.escribir },
        { actividad: 'Hablar', tiempo: tiempoUsoMedio.hablar }
    ];

    const nombreMes = obtenerNombreMes(mes);

    return (
        <Document>
            {tareasPaginadas.map((tareasPagina, indicePagina) => (
                <Page key={`tareas-${indicePagina}`} size="A4" style={styles.page}>
                    <View>
                        <View style={styles.header}>
                            <Image src={logo} style={styles.logo} />
                            <Text style={styles.title}>Diego Padilla Recuperación Final</Text>
                        </View>
                        <Text style={styles.subtitle}>Informe de {nombreMes} de {anio}</Text>

                        <Text style={{ ...styles.text, marginTop: 20, fontWeight: 'bold' }}>
                            Tareas {indicePagina > 0 ? `(continuación ${indicePagina + 1})` : ''}
                        </Text>

                        <View style={styles.table}>
                            <View style={styles.tableRowHeader}>
                                <View style={styles.tableCol4}>
                                    <Text style={styles.tableHeaderText}>Nombre</Text>
                                </View>
                                <View style={styles.tableCol4}>
                                    <Text style={styles.tableHeaderText}>Tipo</Text>
                                </View>
                                <View style={styles.tableCol4}>
                                    <Text style={styles.tableHeaderText}>Fecha</Text>
                                </View>
                                <View style={styles.tableCol4}>
                                    <Text style={styles.tableHeaderText}>Estado</Text>
                                </View>
                            </View>

                            {tareasPagina.map((tarea, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <View style={styles.tableCol4}>
                                        <Text style={styles.tableCellText}>{tarea.nombre}</Text>
                                    </View>
                                    <View style={styles.tableCol4}>
                                        <Text style={styles.tableCellText}>{tarea.tipo}</Text>
                                    </View>
                                    <View style={styles.tableCol4}>
                                        <Text style={styles.tableCellText}>
                                            {new Date(tarea.fecha_entrega).toLocaleDateString()}
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol4}>
                                        <Text style={styles.tableCellText}>{tarea.completada ? "Realizada" : "Vencida"}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.pageNumber}>
                            Página {indicePagina + 1} de {tareasPaginadas.length + tiempoUsoPaginado.length + 4}
                        </Text>
                    </View>
                </Page>
            ))}

            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={{ ...styles.text, marginTop: 20, fontWeight: 'bold' }}>Trabajo realizado</Text>

                    <View style={styles.table}>
                        <View style={styles.tableRowHeader}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Realizadas</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Vencidas</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>{tareas.filter(tarea => tarea.completada).length}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>{tareas.filter(tarea => !tarea.completada).length}</Text>
                            </View>
                        </View>
                    </View>
                    
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
                    <Text style={styles.text}>• Porcentaje de éxito: {porcentajeExito()}%</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.pageNumber}>
                        Página {tareasPaginadas.length + 1} de {tareasPaginadas.length + tiempoUsoPaginado.length + 4}
                    </Text>
                </View>
            </Page>

            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>Tipos de tareas generadas</Text>

                    <View style={styles.table}>
                        <View style={styles.tableRowHeader}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Speaking</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Writing</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>{tipoTareas.speaking}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>{tipoTareas.writing}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.pageNumber}>
                        Página {tareasPaginadas.length + 2} de {tareasPaginadas.length + tiempoUsoPaginado.length + 4}
                    </Text>
                </View>
            </Page>

            {tiempoUsoPaginado.map((tiempoUsoPagina, indicePagina) => (
                <Page key={`tiempo-uso-${indicePagina}`} size="A4" style={styles.page}>
                    <View>
                        <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                            Tiempo de uso diario {indicePagina > 0 ? `(continuación ${indicePagina + 1})` : ''}
                        </Text>

                        <View style={styles.table}>
                            <View style={styles.tableRowHeader}>
                                <View style={styles.tableCol4}>
                                    <Text style={styles.tableHeaderText}>Día</Text>
                                </View>
                                <View style={styles.tableCol4}>
                                    <Text style={styles.tableHeaderText}>Leer</Text>
                                </View>
                                <View style={styles.tableCol4}>
                                    <Text style={styles.tableHeaderText}>Escribir</Text>
                                </View>
                                <View style={styles.tableCol4}>
                                    <Text style={styles.tableHeaderText}>Hablar</Text>
                                </View>
                            </View>

                            {tiempoUsoPagina.map((tiempo, index) => (
                                <View key={index} style={styles.tableRow}>
                                    <View style={styles.tableCol4}>
                                        <Text style={styles.tableCellText}>{tiempo.dia}</Text>
                                    </View>
                                    <View style={styles.tableCol4}>
                                        <Text style={styles.tableCellText}>{tiempo.leer}</Text>
                                    </View>
                                    <View style={styles.tableCol4}>
                                        <Text style={styles.tableCellText}>
                                            {tiempo.escribir}
                                        </Text>
                                    </View>
                                    <View style={styles.tableCol4}>
                                        <Text style={styles.tableCellText}>
                                            {tiempo.hablar}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.pageNumber}>
                            Página {tareasPaginadas.length + 3 + indicePagina} de {tareasPaginadas.length + tiempoUsoPaginado.length + 4}
                        </Text>
                    </View>
                </Page>
            ))}

            <Page size="A4" style={styles.page}>
                <View>
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
                </View>

                <View style={styles.footer}>
                    <Text style={styles.pageNumber}>
                        Página {tareasPaginadas.length + tiempoUsoPaginado.length + 3} de {tareasPaginadas.length + tiempoUsoPaginado.length + 4}
                    </Text>
                </View>
            </Page>

            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={{ ...styles.text, marginTop: 20, fontWeight: 'bold' }}>Tiempo de uso medio</Text>

                    <View style={styles.table}>
                        <View style={styles.tableRowHeader}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Leer</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Escribir</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableHeaderText}>Hablar</Text>
                            </View>
                        </View>

                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>{tiempoUsoMedio.leer}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>{tiempoUsoMedio.escribir}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellText}>
                                    {tiempoUsoMedio.hablar}
                                </Text>
                            </View>
                        </View>
                    </View>
                    
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
                </View>

                <View style={styles.footer}>
                    <Text style={styles.pageNumber}>
                        Página {tareasPaginadas.length + tiempoUsoPaginado.length + 4} de {tareasPaginadas.length + tiempoUsoPaginado.length + 4}
                    </Text>
                </View>
            </Page>
        </Document>
    );
}