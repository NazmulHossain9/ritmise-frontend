<template>
  <div class="screen">
    <div class="breadcrumb">
      <button @click="router.push({ name: 'orders-hub' })">← Orders</button>
      <span>/</span><span>Delivery Check</span>
    </div>
    <div class="page-title"><div><h1>Delivery Check</h1></div></div>

    <div class="card">
      <div class="field">
        <label>Order reference</label>
        <select v-model="form.orderRef" @change="loadRef">
          <option value="gfs">GFS — $460 — Tomorrow morning</option>
          <option value="bondi">Bondi — $220 — Today afternoon</option>
          <option value="none">No registered order</option>
        </select>
      </div>
      <div class="row">
        <div class="field"><label>Supplier</label><input readonly :value="form.supplier" /></div>
        <div class="field">
          <label>Checked by *</label>
          <select v-model="form.checker"><option v-for="s in staff" :key="s">{{ s }}</option></select>
        </div>
      </div>
      <div class="field"><label>Delivered by (optional)</label><input v-model="form.driver" placeholder="Driver name or rep" /></div>
      <div class="field">
        <label>Any issues?</label>
        <select v-model="form.hasIssue">
          <option value="no">No — all good</option>
          <option value="yes">Yes — log an issue</option>
        </select>
      </div>

      <template v-if="form.hasIssue === 'yes'">
        <div class="field">
          <label>Issue type</label>
          <select v-model="form.issueType">
            <option>Quantity Short</option><option>Item Missing</option><option>Wrong Item</option>
            <option>Damaged / Unacceptable</option><option>Extra Product</option>
            <option>Invoice Missing</option><option>Other</option>
          </select>
        </div>
        <div class="field"><label>Issue note *</label><textarea v-model="form.issueNote" placeholder="Describe the issue"></textarea></div>
      </template>

      <div class="field">
        <label>Invoice state</label>
        <select v-model="form.invoiceState">
          <option>Received with delivery</option><option>Online / email</option>
          <option>Comes later</option><option>Not received yet</option>
        </select>
      </div>
      <div class="field">
        <label>Any returns?</label>
        <select v-model="form.hasReturn">
          <option value="no">No</option><option value="yes">Yes</option>
        </select>
      </div>
      <div v-if="form.hasReturn === 'yes'" class="field">
        <label>Return note</label><textarea v-model="form.returnNote" placeholder="What was returned and why"></textarea>
      </div>

      <button @click="submitDelivery">Submit Delivery Check</button>
      <div v-if="saved" class="notice green mt10">✓ Delivery check submitted</div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const store = useAppStore()
const staff = ['Krystal', 'Tommaso', 'Mackenzie']

const suppliers = { gfs: 'GFS', bondi: 'Bondi', none: '' }

const form = reactive({
  orderRef: 'gfs', supplier: 'GFS', checker: 'Krystal', driver: '',
  hasIssue: 'no', issueType: 'Quantity Short', issueNote: '',
  invoiceState: 'Received with delivery', hasReturn: 'no', returnNote: '',
})

const saved = ref(false)

function loadRef() { form.supplier = suppliers[form.orderRef] || '' }

function submitDelivery() {
  if (form.hasIssue === 'yes' && !form.issueNote.trim()) {
    store.toast('Issue note is required'); return
  }
  saved.value = true
  store.toast('Delivery check submitted ✓')
}
</script>
