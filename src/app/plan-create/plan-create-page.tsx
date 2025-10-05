import { Form } from '@/components/ui/form.tsx';
import { TextInput, Textarea } from '@/components/text-input';
import { FreeTrialField } from '@/app/plan-create/components/free-trial-field.tsx';
import { DiscountField } from '@/app/plan-create/components/discount-field.tsx';
import { FeaturesSection } from '@/app/plan-create/components/features-section.tsx';
import { CountryField } from '@/app/plan-create/components/country-field.tsx';
import { Button } from '@/components/ui/button.tsx';
import { PriceField } from '@/app/plan-create/components/price-field.tsx';
import { usePlanCreate } from '@/app/plan-create/hooks/use-plan-create.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

export function PlanCreatePage() {
  const { form, onSubmit, isEdit, isLoading } = usePlanCreate();

  return (
    <div>
      <h3 className="font-semibold flex-1">{isEdit ? 'Update plan' : 'Create new plan'}</h3>

      {isLoading ? (
        <div className="mt-8 grid gap-8 max-w-xl">
          {[...Array(3)].map((_, index) => (
            <Skeleton className="h-12 w-full" key={index} />
          ))}
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 mt-8">
            <div className="grid gap-y-6 max-w-xl flex-1">
              <CountryField form={form} disabled={isEdit} />

              <TextInput
                control={form.control}
                name="name"
                label="Plan Title"
                placeholder="Plan Title"
              />

              <Textarea
                control={form.control}
                name="description"
                label="Description"
                placeholder="Description"
              />

              <PriceField form={form} />

              <FreeTrialField form={form} />

              <DiscountField form={form} />

              <FeaturesSection form={form} />

              <div className="grid grid-cols-2 gap-4">
                <Button
                  name="draft"
                  size="lg"
                  variant="outline"
                  type="submit"
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                  Save as draft
                </Button>
                <Button
                  name="publish"
                  size="lg"
                  type="submit"
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                  Save and publish
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
