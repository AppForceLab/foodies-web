import { Button } from '../../ui-kit';
import CustomModal from '../CustomModal/CustomModal';
import styles from './LogOutModal.module.scss';

const LogOutModal = ({ isOpen, onRequestClose }) => {
  return (
    <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.signUpWrapper}>
        <h2 className={styles.title}>Are you logging out?</h2>
        <h2 className={styles.titleSmall}>Log out</h2>
        <h2 className={styles.textContainer}>
          You can always log back in at my time.
        </h2>
        <div className={styles.btnWraper}>
          <Button className={styles.button} onClick={onRequestClose}>
            log out
          </Button>
          <Button
            className={styles.button}
            onClick={onRequestClose}
            variant={'outline'}
          >
            cancel
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default LogOutModal;
