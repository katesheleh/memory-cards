import React from 'react';
import styles from './Preloader.module.css';
import preloader from '../../../assets/images/loader.svg';

const Preloader = React.memo(() => {
	return (
			<div className={styles.wrapper}>
				<img src={preloader} className={styles.img} alt='loader'/>
			</div>
	)
})

export default Preloader;