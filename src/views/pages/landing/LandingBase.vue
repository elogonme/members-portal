<template>
  <section id="knowledge-base">
    <!-- seach banner  -->
    <v-card
      flat
      class="knowledge-base-bg d-flex align-center justify-center text-center mb-7"
    >
      <v-card-text>
        <p class="kb-title text-2xl font-weight-semibold white--text mb-2">
          Managing and accessing your benefits should be easy.
        </p>
        <p class="mb-7 text-lg white--text">
          Our customer-focused approach gives you everything you deserve
        </p>
        <v-btn
          color="primary"
          @click="$router.push({ name: 'auth-login' })"
        >
          Member Login
        </v-btn>
        <!-- <v-form class="kb-search-input mx-auto">
          <v-text-field
            v-model="knowledgeBaseSearchQuery"
            outlined
            placeholder="Ask a question...."
            hide-details
            class="kb-search-input"
          >
            <template #prepend-inner>
              <v-icon
                size="23"
                class="mx-1"
              >
                {{ icons.mdiMagnify }}
              </v-icon>
            </template>
          </v-text-field>
        </v-form> -->
      </v-card-text>
    </v-card>

    <!-- kb search content -->
    <div id="knowledge-base-content">
      <v-row class="kb-search-content-info match-height">
        <v-col
          v-for="item in filteredKB"
          :key="item.character"
          md="4"
          sm="6"
          cols="12"
          class="kb-search-content"
        >
          <v-card
            color="text-center cursor-pointer"
            @click.native="$router.push({ name: 'page-knowledge-base-category', params: { category: item.category } })"
          >
            <v-img

              max-height="200"
              class="mx-auto"
              :src="item.character"
            ></v-img>

            <!-- title -->
            <v-card-title class="justify-center pb-3">
              {{ item.title }}
            </v-card-title>
            <v-card-text>{{ item.desc }}</v-card-text>
          </v-card>
        </v-col>

        <!-- no result found -->
        <v-col
          v-show="!filteredKB.length"
          cols="12"
          class="text-center"
        >
          <h4 class="mt-4">
            Search result not found!!
          </h4>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script>
/* eslint-disable implicit-arrow-linebreak */
import { mdiMagnify } from '@mdi/js'
import { computed, ref } from '@vue/composition-api'
import useAppConfig from '@/@core/@app-config/useAppConfig'

export default {
  setup() {
    const knowledgeBaseSearchQuery = ref('')

    const { menuIsMenuHidden } = useAppConfig()

    const kbContentData = [
      {
        character: require('@/assets/images/pbas/landing-1.webp'),
        category: 'prudent-benefits',
        characterSize: '400',
        title: 'Prudent Benefits',
        desc: 'Are you managing the benefits and day-to-day operations for your employees or plan members? We have a plan to help you.',
      },
      {
        character: require('@/assets/images/pbas/landing-6.webp'),
        category: 'student-benefits',
        characterSize: '188',
        title: 'Student Benefits',
        desc: 'We understand the complexities and challenges of administering benefit programs for student unions. Our third party administration solutions are price-sensitive without sacrificing excellent service to your staff/plan members.',
      },
      {
        character: require('@/assets/images/pbas/landing-3.webp'),
        category: 'benchmark',
        characterSize: '126',
        title: 'Benchmark',
        desc: 'Whether your organization operates across the country or locally, you have needs specific to each region. The team at Benchmark Decisions is guided by leading professionals in insurance underwriting, retirement planning, actuarial science and plan design in Canada with regional expertise.',
      },
      {
        character: require('@/assets/images/pbas/landing-7.webp'),
        category: 'health-and-welfare',
        characterSize: '172',
        title: 'Health and Welfare',
        desc: 'There is perhaps no better demonstration of the folly of human conceits.',
      },
      {
        character: require('@/assets/images/pbas/landing-2.jpg'),
        category: 'Carelogix',
        characterSize: '163',
        title: 'Personalization',
        desc: 'Managing patient care and disability services for your employees and plan members is a challenge for any organization. Carelogix has the experience and knowledge to help people during difficult times and make those situations manageable for everyone.',
      },
      {
        character: require('@/assets/images/pbas/landing-5.webp'),
        category: 'Pensions',
        characterSize: '156',
        title: 'Pensions',
        desc: 'Competent means we will never take anything for granted.',
      },
    ]

    const filteredKB = computed(() => {
      const knowledgeBaseSearchQueryLower = knowledgeBaseSearchQuery.value.toLowerCase()

      return kbContentData.filter(
        item =>
          // eslint-disable-next-line operator-linebreak
          item.title.toLowerCase().includes(knowledgeBaseSearchQueryLower) ||
          item.desc.toLowerCase().includes(knowledgeBaseSearchQueryLower),
      )
    })

    return {
      knowledgeBaseSearchQuery,
      kbContentData,
      filteredKB,
      menuIsMenuHidden,
      icons: { mdiMagnify },
    }
  },
}
</script>

<style lang="scss">
@import '@core/preset/preset/pages/knowledge-base.scss';
</style>
