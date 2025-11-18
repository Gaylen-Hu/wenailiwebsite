<script>
import AposInputSelect from 'apostrophe/modules/@apostrophecms/schema/ui/apos/components/AposInputSelect.vue';

export default {
  name: "ChartSelectInput",
  components: {
    AposInputSelect
  },
  extends: AposInputSelect,
  mounted() {
    this.setChoices(this.followingValues?.['<_chartdataSet']?.[0]);
  },
  methods: {
    setChoices(chartData = {}) {
      console.log('chartData setChoices', chartData);
      const columnValues = chartData?.columns;
      this.choices = [
        {
          label: '',
          value: 'undefined'
        },
        ...(columnValues || []).map(column => ({
          label: column,
          value: column
        }))
      ];
      console.log('field', this.field);
      this.field.choices = this.choices;
    }
  },
  watch: {
    followingValues: {
      handler(newValue, oldValue) {
        if (oldValue !== newValue ){
          const [ chartdataSet ]  = newValue?.['<_chartdataSet'] || [];
          this.setChoices(chartdataSet);
        }
      }
    }
  }
};
</script>