import React, { useEffect } from 'react'
import { Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField, makeStyles } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ImageAvatar from '../common/ImageAvatar';
import { useEthereumAddressBalance } from '../../utils/useFetch';

const platforms = [
    { value: 'ethereum', name: 'Ethereum', icon: 'eth.png', currency: 'ETH' },
    { value: 'bsc', name: 'Binance Smart Chain', icon: 'bnb.png', currency: 'BNB' },
    { value: 'polygon', name: 'Polygon (MATIC)', icon: 'matic.png', currency: 'MATIC' },
]
const pMap = platforms.reduce((obj, el) => {
    obj[el.value] = el
    obj[el.value].chip = (
        <Chip
            avatar={<ImageAvatar chip alt={el.name} src={`/crypto-assets/${el.icon}`} />}
            label={el.currency}
        />
    )
    return obj
}, {})

const schema = yup.object().shape({
    platform: yup.string().oneOf(platforms.map(p => p.value)).required(),
    address: yup.string().required(),
    balance: yup.number().required()
  });

const useStyles = makeStyles((theme) => ({
    balance: {
        flexGrow: 1,
    },
    balanceGrid: {
        flexFlow: 'row'
    }
}));


function NewWalletForm() {
    const classes = useStyles()
    const { handleSubmit, control, watch, setValue, setError, clearErrors } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            platform: 'ethereum',
            address: '',
            balance: ''
        }
    })
    const platform = watch('platform')
    const address = watch('address')

    const { data: eth, isLoading, isError } = useEthereumAddressBalance(address)
    useEffect(() => {
        if (isLoading) {

        } else if (isError) {
            setError('address', { message: isError.info.error })
            console.log(isError.info.error)
            setValue('balance', '')
        } else if(!isLoading && !isError) {
            setValue('balance', eth.balance)
            clearErrors('address')
        }
    }, [eth, isLoading, isError, setValue, setError, clearErrors])
    return (
        <form onSubmit={handleSubmit} >
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="platform" id="platform-lbl">Platform</InputLabel>
                        <Controller
                            name="platform"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select labelId="platform-lbl" onChange={onChange} value={value}>
                                    {platforms.map(p => (
                                        <MenuItem value={p.value} key={p.value}>{p.name}</MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Address"
                                fullWidth 
                                error={!!fieldState.error}
                                helperText={fieldState.error && fieldState.error.message}
                                {...field}
                            />
                        )}
                    />      
                </Grid>
                <Grid item xs={12} md={3}>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.balanceGrid} >
                        {pMap[platform] && (
                            <Grid item>
                                {pMap[platform].chip}
                            </Grid>
                        )}
                        <Grid item className={classes.balance}>
                            <Controller
                                name="balance"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        fullWidth
                                        disabled
                                        label="Balance"
                                        {...field}
                                    />
                                )}
                            />   
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
}

export default NewWalletForm