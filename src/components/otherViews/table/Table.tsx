import * as React from "react";
import {useTheme} from "../../../core/style/ThemeContext.tsx";

interface TableRowProps {
    label: string;
    value: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({label, value}) => (
    <tr>
        <td style={{
            padding: '8px',
            border: '1px solid #E0E0E0',
            fontWeight: 'bold',
            color: '#8E8E93',
            width: '50%',
            textAlign: 'left',
            fontSize: '17px',
            fontFamily: 'SFREGULAR',
        }}>
            {label}
        </td>
        <td style={{
            padding: '8px',
            border: '1px solid #E0E0E0',
            color: '#333',
            width: '50%',
            textAlign: 'right'
        }}>
            {value}
        </td>
    </tr>
);

interface GiftTableProps {
    rows: { label: string; value: React.ReactNode; icon?: string }[];
}

const GiftTable: React.FC<GiftTableProps> = ({rows}) => {

    const {theme} = useTheme()

    return (
        <div style={{
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            overflow: 'hidden',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: theme.tableBg,
            width: '100%',
        }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
            }}>
                <tbody>
                {rows.map((row, index) => (
                    <TableRow
                        key={index}
                        label={row.label}
                        value={
                            <>
                                {row.icon && (
                                    <img
                                        src={row.icon}
                                        alt=""
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            marginRight: '4px',
                                            verticalAlign: 'middle'
                                        }}
                                    />
                                )}
                                <span style={{
                                    color: theme.tTitle,
                                    fontSize: '17px',
                                    fontFamily: 'SFREGULAR',
                                }}>
                                {row.value}
                            </span>
                            </>
                        }
                    />
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default GiftTable;