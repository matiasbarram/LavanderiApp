import { AnimatePresence, motion } from 'framer-motion'
import Spinner from '../Spinner/spinner'

export default function Savingtoast({
    saving,
    title,
}: {
    saving: boolean
    title?: string
}) {
    return (
        <AnimatePresence initial={false}>
            {saving && (
                <motion.div
                    className="fixed right-0 top-10 z-50 mb-4 mr-4"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                >
                    <div className="rounded-lg bg-primary-foreground px-3 py-2 shadow-lg">
                        <div className="flex flex-row items-center">
                            <div className="w-10 px-2">
                                <Spinner />
                            </div>
                            <p className="text-sm text-white">
                                {title ?? 'Guardando...'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
