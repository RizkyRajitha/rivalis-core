import MessagingAdapter from './MessagingAdapter'
import QueueAdapter from './QueueAdapter'
import StorageAdapter from './StorageAdapter'

class AdapterHolder {
    
    /**
     * @type {StorageAdapter}
     */
    storageAdapter = null

    /**
     * @type {MessagingAdapter}
     */
    messagingAdapter = null

    /**
     * @type {QueueAdapter}
     */
    queueAdapter = null

    /**
     * 
     * @param {StorageAdapter} storageAdapter
     * @param {MessagingAdapter} messagingAdapter
     * @param {QueueAdapter} queueAdapter
     */
    constructor(storageAdapter, messagingAdapter, queueAdapter) {
        if (!(storageAdapter instanceof StorageAdapter)) {
            throw new Error('storageAdapter must be an instance of StorageAdapter Class')
        }

        if (!(messagingAdapter instanceof MessagingAdapter)) {
            throw new Error('messagingAdapter must be an instance of MessagingAdapter Class')
        }

        if (!(queueAdapter instanceof QueueAdapter)) {
            throw new Error('queueAdapter must be an instance of QueueAdapter Class')
        }

        this.storageAdapter = storageAdapter
        this.messagingAdapter = messagingAdapter
        this.queueAdapter = queueAdapter
    }

    /**
     * 
     * @returns {Promise<boolean>}
     */
    initialize() {
        return this.storageAdapter.initialize().then(() => {
            return this.messagingAdapter.initialize()
        }).then(() => {
            return this.queueAdapter.initialize()
        })
    }

}

export default AdapterHolder