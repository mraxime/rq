'use client';

import type { FC } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	FormControlLabel,
	Grid,
	InputAdornment,
	Stack,
	SvgIcon,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Controller, FormProvider, useForm, type DefaultValues } from 'react-hook-form';
import { Icons } from 'src/components/base/Icons';
import { PRICE_STATUS_MAP, PRICE_TYPES_MAP } from 'src/constants/price';
import useDisclosure from 'src/hooks/useDisclosure';
import { usePriceActions } from 'src/hooks/usePrices';
import type { Price, PriceInput } from 'src/types';
import { getPriceCurrency } from 'src/utils';
import { zodResolverEnhanced } from 'src/utils/zod';
import { createPriceSchema, updatePriceSchema } from 'src/validations/price';
import PriceFormConditions from './PriceFormConditions';
import { generatePriceConditionDesc } from './utils';

/**
 * Creates the initial values structure object of the form.
 */
const getInitialValues = (payload?: Props['defaultValues']): Props['defaultValues'] => ({
	companyId: payload?.companyId ?? undefined,
	status: payload?.status ?? 'active',
	name: payload?.name ?? '',
	type: payload?.type ?? 'base',
	value: payload?.value ?? '',
	taxable: payload?.taxable ?? true,
	conditions: payload?.conditions ?? [],
});

type Props = {
	id?: Price['id'];
	defaultValues?: DefaultValues<PriceInput>;
	onSuccess?: () => void;
	onCancel?: () => void;
};

const PriceForm: FC<Props> = ({ id, defaultValues, onSuccess, onCancel }) => {
	const isNew = !id;
	const priceActions = usePriceActions();

	const form = useForm<PriceInput>({
		resolver: zodResolverEnhanced(isNew ? createPriceSchema : updatePriceSchema),
		defaultValues: getInitialValues(defaultValues),
	});

	const conditionsDisclosure = useDisclosure();

	const handleFormSubmit = form.handleSubmit(async (formValues) => {
		isNew ? await priceActions.create(formValues) : await priceActions.update(id, formValues);
		form.reset(getInitialValues(formValues));
		onSuccess?.();
	});

	const selectedPriceType = form.watch('type');

	const conditions = form.watch('conditions');

	return (
		<FormProvider {...form}>
			<form id="price-form" onSubmit={handleFormSubmit} noValidate>
				<Card>
					<CardHeader
						title={
							<Stack direction="row" alignItems="center" spacing={1}>
								<SvgIcon fontSize="small" color="primary">
									<Icons.price />
								</SvgIcon>
								<Typography variant="h6">Fiche du prix</Typography>
							</Stack>
						}
					/>
					<Divider />
					<CardContent component={Stack} spacing={3.5}>
						<div>
							<Grid container spacing={3.5}>
								<Grid item xs={12} sm={8}>
									<TextField
										autoFocus={isNew}
										error={Boolean(form.formState.errors.name)}
										fullWidth
										required
										helperText={form.formState.errors.name?.message}
										label="Nom du prix"
										{...form.register('name')}
									/>
								</Grid>
								<Grid item xs={12} sm={4}>
									<Controller
										control={form.control}
										name="status"
										render={({ field }) => (
											<TextField
												error={Boolean(form.formState.errors.status)}
												fullWidth
												helperText={form.formState.errors.status?.message}
												label="Statut"
												select
												SelectProps={{ native: true }}
												value={field.value}
												onChange={field.onChange}
												onBlur={field.onBlur}
											>
												{Object.values(PRICE_STATUS_MAP).map(({ title, value }) => (
													<option value={value} key={value}>
														{title}
													</option>
												))}
											</TextField>
										)}
									/>
								</Grid>
							</Grid>
						</div>

						<Controller
							control={form.control}
							name="taxable"
							render={({ field }) => (
								<FormControlLabel
									control={<Switch color="primary" />}
									label="Taxable"
									checked={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							)}
						/>

						<Divider>
							<Typography variant="subtitle2">Montant à charger</Typography>
						</Divider>

						<Stack direction={{ sm: 'row' }} gap={3.5}>
							<Controller
								control={form.control}
								name="type"
								render={({ field }) => (
									<TextField
										error={Boolean(form.formState.errors.type)}
										fullWidth
										helperText={form.formState.errors.type?.message}
										label="Type de prix"
										select
										SelectProps={{ native: true }}
										value={field.value}
										onChange={field.onChange}
										onBlur={field.onBlur}
									>
										{Object.values(PRICE_TYPES_MAP).map(({ title: name, value }) => (
											<option value={value} key={value}>
												{name}
											</option>
										))}
									</TextField>
								)}
							/>
							<TextField
								type="number"
								error={Boolean(form.formState.errors.value)}
								fullWidth
								required
								helperText={form.formState.errors.value?.message}
								label="Montant"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Typography>{getPriceCurrency(selectedPriceType)}</Typography>
										</InputAdornment>
									),
								}}
								{...form.register('value')}
							/>
						</Stack>

						<Divider>
							<Button
								color="inherit"
								sx={{
									backgroundColor: (theme) =>
										conditionsDisclosure.isOpen
											? alpha(theme.palette.text.primary, 0.04)
											: undefined,
								}}
								onClick={conditionsDisclosure.toggle}
							>
								<Typography variant="subtitle2">Conditions</Typography>
							</Button>
						</Divider>

						<div>
							{conditionsDisclosure.isOpen ? (
								<PriceFormConditions />
							) : (
								<Box component="ul" margin={0} display="grid">
									{conditions.map((condition) => {
										const conditionDescription = generatePriceConditionDesc(condition);
										return (
											Boolean(conditionDescription) && (
												<li key={condition.id}>
													<Typography variant="caption">{conditionDescription}</Typography>
												</li>
											)
										);
									})}
								</Box>
							)}
						</div>
					</CardContent>
				</Card>

				<Stack mt={4} direction="row" spacing={2} justifyContent="end">
					{onCancel && (
						<Button color="inherit" onClick={onCancel}>
							Annuler
						</Button>
					)}
					<Button
						type="submit"
						variant="contained"
						disabled={form.formState.isSubmitting || !form.formState.isDirty}
					>
						Enregistrer
					</Button>
				</Stack>
			</form>
		</FormProvider>
	);
};

export default PriceForm;
