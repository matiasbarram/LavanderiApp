import { AnimatePresence, motion } from 'framer-motion';
import Spinner from '../Spinner/spinner';

export default function Savingtoast({ saving, title }: { saving: boolean, title?: string }) {
    return (
        <AnimatePresence initial={false}>
            {saving &&
                (
                    <motion.div
                        className="fixed top-10 right-0 z-50 mb-4 mr-4"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                    >
                        <div className="rounded-lg py-2 px-3 shadow-lg bg-primary-foreground">
                            <div className="flex flex-row items-center">
                                <div className="px-2 w-10">
                                    <Spinner />
                                </div>
                                <p className="text-sm text-white">{title ?? "Guardando..."}</p>
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
}
