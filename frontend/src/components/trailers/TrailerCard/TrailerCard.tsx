import type { FC } from 'react';
import {
	Card,
	CardHeader,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';

import type { Trailer } from 'src/lib/types/directus';

type Props = {
	data: Trailer;
};

const TrailerCard: FC<Props> = ({ data: trailer }) => {
	return (
		<Card>
			<CardHeader title="Remorque" />
			<Divider />
			<Table>
				<TableBody>
					<TableRow>
						<TableCell sx={{ fontWeight: 'fontWeightMedium' }}>Id</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{trailer.id}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{ fontWeight: 'fontWeightMedium' }}>Nom unique</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{trailer.name}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{ fontWeight: 'fontWeightMedium' }}>Appartient à</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{trailer.belongs_to}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{ fontWeight: 'fontWeightMedium' }}>Marque/Modèle/Année</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{trailer.model}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{ fontWeight: 'fontWeightMedium' }}>Masse net</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{trailer.weight && `${trailer.weight} kg`}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{ fontWeight: 'fontWeightMedium' }}>Numéro de série</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{trailer.serial_nb}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{ fontWeight: 'fontWeightMedium' }}>Numéro de plaque</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{trailer.plate_nb}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{ fontWeight: 'fontWeightMedium' }}>Type</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{trailer.type}
							</Typography>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell sx={{ fontWeight: 'fontWeightMedium' }}>En service</TableCell>
						<TableCell>
							<Typography variant="body2" color="textSecondary">
								{trailer.in_service ? 'Oui' : 'Non'}
							</Typography>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
};

export default TrailerCard;