import type { FC } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { Icons } from 'src/components/base/Icons';
import { ROUTES } from 'src/constants/routes';
import { useAuthActions } from 'src/hooks/useAuth';
import type { User } from 'src/types';

type Props = {
	user: User;
	anchorEl: null | Element;
	onClose?: () => void;
	open?: boolean;
};

const AccountPopover: FC<Props> = ({ user, anchorEl, onClose, open = false }) => {
	const authActions = useAuthActions();
	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				horizontal: 'center',
				vertical: 'bottom',
			}}
			disableScrollLock
			onClose={onClose}
			open={open}
			PaperProps={{ sx: { width: 200 } }}
		>
			<Box sx={{ p: 2 }}>
				<Typography variant="body1">
					{user.firstName} {user.lastName}
				</Typography>
				<Typography color="text.secondary" variant="body2">
					{user.email}
				</Typography>
			</Box>
			<Divider />
			<Box sx={{ p: 1 }}>
				<ListItemButton
					component={Link}
					href={ROUTES.ProfilePage()}
					onClick={onClose}
					sx={{
						borderRadius: 1,
						px: 1,
						py: 0.5,
					}}
				>
					<ListItemIcon>
						<SvgIcon fontSize="small">
							<Icons.user />
						</SvgIcon>
					</ListItemIcon>
					<ListItemText primary={<Typography variant="body1">Mon profil</Typography>} />
				</ListItemButton>
			</Box>
			<Divider sx={{ my: '0 !important' }} />
			<Box
				sx={{
					p: 1,
				}}
			>
				<form action={authActions.logout} style={{ width: '100%' }}>
					<Button type="submit" color="error" size="small" fullWidth>
						Se déconnecter
					</Button>
				</form>
			</Box>
		</Popover>
	);
};

export default AccountPopover;
