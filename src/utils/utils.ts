import dayjs from 'dayjs';

export const today = new Date();

export const formatDate = (date: Date) => dayjs(date).format('DD-MM-YYYY');