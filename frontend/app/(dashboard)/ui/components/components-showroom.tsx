"use client";

import * as React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { getUiLibrary, upsertUiLibrary } from "@/lib/api/ui-library";
import type { EChartsCoreOption } from "@/lib/echarts/core";
import { Chart } from "@/components/ui/chart";

type UiManifestItem = {
  key: string;
  title: string;
  group: string;
  status: "installed" | "planned" | "legacy";
  allowedIn: Array<"website" | "webapp" | "customBlock">;
  files: string[];
  notes?: string[];
};

type UiManifest = {
  version: string;
  items: UiManifestItem[];
};

function inferImportPath(item: UiManifestItem) {
  const file = item.files.find((f) => f.startsWith("frontend/components/ui/") && f.endsWith(".tsx"));
  if (!file) return undefined;
  const base = file.split("/").pop()?.replace(/\.tsx$/, "");
  if (!base) return undefined;
  return `@/components/ui/${base}`;
}

function exportNameForKey(key: string) {
  const map: Record<string, string> = {
    accordion: "Accordion",
    "alert-dialog": "AlertDialog",
    alert: "Alert",
    avatar: "Avatar",
    badge: "Badge",
    breadcrumb: "Breadcrumb",
    button: "Button",
    "button-group": "ButtonGroup",
    calendar: "Calendar",
    card: "Card",
    chart: "Chart",
    checkbox: "Checkbox",
    command: "Command",
    "context-menu": "ContextMenu",
    dialog: "Dialog",
    drawer: "Drawer",
    "dropdown-menu": "DropdownMenu",
    empty: "Empty",
    field: "Field",
    form: "Form",
    input: "Input",
    "input-group": "InputGroup",
    "input-otp": "InputOTP",
    kbd: "Kbd",
    label: "Label",
    menubar: "Menubar",
    "navigation-menu": "NavigationMenu",
    pagination: "Pagination",
    popover: "Popover",
    progress: "Progress",
    "radio-group": "RadioGroup",
    "scroll-area": "ScrollArea",
    select: "Select",
    separator: "Separator",
    sheet: "Sheet",
    sidebar: "Sidebar",
    skeleton: "Skeleton",
    sonner: "Toaster",
    switch: "Switch",
    table: "Table",
    tabs: "Tabs",
    textarea: "Textarea",
    toggle: "Toggle",
    "toggle-group": "ToggleGroup",
    tooltip: "Tooltip",
    typography: "Typography",
  };
  return map[key];
}

function exampleUsageForKey(key: string) {
  switch (key) {
    case "button":
      return `<Button>Action</Button>`;
    case "badge":
      return `<Badge variant="secondary">Pro</Badge>`;
    case "input":
      return `<Input placeholder="Email" />`;
    case "card":
      return `<Card><CardHeader /><CardContent /></Card>`;
    case "tabs":
      return `<Tabs defaultValue="a">...</Tabs>`;
    case "dialog":
      return `<Dialog><DialogTrigger /><DialogContent /></Dialog>`;
    case "table":
      return `<Table>...</Table>`;
    case "chart":
      return `<Chart option={option} height={280} />`;
    case "typography":
      return `<Typography variant="h2">Titre</Typography>`;
    default: {
      const name = exportNameForKey(key);
      if (!name) return undefined;
      return `<${name} />`;
    }
  }
}

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = getKey(item);
    const list = map.get(k) ?? [];
    list.push(item);
    map.set(k, list);
  }
  return map;
}

function CopyButton({ text, label = "Copier" }: { text: string; label?: string }) {
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          toast.success("Copié.");
        } catch {
          toast.error("Copie impossible.");
        }
      }}
    >
      {label}
    </Button>
  );
}

function FormPreview() {
  const form = useForm<{ email: string }>({
    defaultValues: { email: "" },
    mode: "onChange",
  });

  return (
    <Form {...form}>
      <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email requis" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@exemple.com" {...field} />
              </FormControl>
              <FormDescription>Exemple de champ validé via react-hook-form.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <Button type="submit" onClick={() => form.trigger()}>
            Valider
          </Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}

function previewForKey(key: string) {
  switch (key) {
    case "accordion":
      return (
        <Accordion type="single" collapsible defaultValue="a" className="w-full">
          <AccordionItem value="a">
            <AccordionTrigger>Section A</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Contenu A
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Section B</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              Contenu B
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    case "alert":
      return (
        <div className="grid gap-2">
          <Alert>
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>Exemple d’alerte neutre.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>Exemple d’alerte destructive.</AlertDescription>
          </Alert>
        </div>
      );
    case "alert-dialog":
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Ouvrir</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer ?</AlertDialogTitle>
              <AlertDialogDescription>
                Exemple de boîte de confirmation.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction>Continuer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    case "avatar":
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage alt="User" src="https://avatars.githubusercontent.com/u/1?v=4" />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium">Aurora User</p>
            <p className="truncate text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
      );
    case "button":
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Action</Button>
          <Button variant="secondary">Secondaire</Button>
          <Button variant="outline">Outline</Button>
        </div>
      );
    case "button-group":
      return (
        <div className="flex flex-col gap-3">
          <ButtonGroup>
            <Button size="sm" variant="secondary">Jour</Button>
            <Button size="sm" variant="ghost">Semaine</Button>
            <Button size="sm" variant="ghost">Mois</Button>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText>Commande</ButtonGroupText>
            <ButtonGroupSeparator />
            <Button size="sm" variant="outline">Exporter</Button>
          </ButtonGroup>
        </div>
      );
    case "badge":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Badge>New</Badge>
          <Badge variant="secondary">Pro</Badge>
          <Badge variant="outline">Beta</Badge>
        </div>
      );
    case "breadcrumb":
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Settings</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Profil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      );
    case "calendar":
      return (
        <div className="rounded-lg border border-border bg-card p-2">
          <Calendar mode="single" selected={new Date()} />
        </div>
      );
    case "card":
      return (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-base">Carte</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Contenu de la carte.
          </CardContent>
        </Card>
      );
    case "input":
      return (
        <div className="grid gap-2">
          <Input placeholder="Email" />
          <Input placeholder="Recherche…" />
        </div>
      );
    case "input-group":
      return (
        <InputGroup>
          <InputGroupAddon align="inline-start">https://</InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
      );
    case "input-otp":
      return (
        <InputOTP maxLength={6} value="" onChange={() => undefined}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      );
    case "label":
      return (
        <div className="grid gap-2">
          <Label htmlFor="x">Label</Label>
          <Input id="x" placeholder="…" />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox id="c1" />
          <Label htmlFor="c1">Accepter les conditions</Label>
        </div>
      );
    case "command":
      return (
        <div className="rounded-lg border border-border bg-card">
          <Command>
            <CommandInput placeholder="Rechercher…" />
            <CommandList>
              <CommandEmpty>Aucun résultat.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem>Créer</CommandItem>
                <CommandItem>Ouvrir</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navigation">
                <CommandItem>Dashboard</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      );
    case "context-menu":
      return (
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="rounded-lg border border-border bg-muted/10 px-3 py-2 text-sm">
              Clique-droit ici
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Action</ContextMenuItem>
            <ContextMenuItem>Dupliquer</ContextMenuItem>
            <ContextMenuItem>Supprimer</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
    case "dialog":
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Ouvrir</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>Exemple de modal.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary">OK</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    case "drawer":
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Ouvrir</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer</DrawerTitle>
              <DrawerDescription>Exemple de panneau bas.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>Action</Button>
              <DrawerClose asChild>
                <Button variant="outline">Fermer</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    case "dropdown-menu":
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuItem>Déconnexion</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    case "empty":
      return (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon" />
            <EmptyTitle>Aucun résultat</EmptyTitle>
            <EmptyDescription>Exemple d’état vide.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="secondary">Créer</Button>
          </EmptyContent>
        </Empty>
      );
    case "field":
      return (
        <FieldGroup className="max-w-md">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="email@exemple.com" />
            <FieldDescription>Texte d’aide.</FieldDescription>
          </Field>
          <FieldSeparator>ou</FieldSeparator>
          <Field>
            <FieldLabel>Message</FieldLabel>
            <Textarea placeholder="…" />
          </Field>
        </FieldGroup>
      );
    case "form":
      return <FormPreview />;
    case "kbd":
      return (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>Raccourci :</span>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
      );
    case "menubar":
      return (
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Fichier</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Nouveau</MenubarItem>
              <MenubarItem>Ouvrir…</MenubarItem>
              <MenubarItem>Exporter</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Aide</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Documentation</MenubarItem>
              <MenubarItem>Support</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      );
    case "navigation-menu":
      return (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Produit</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-2 p-4 text-sm">
                  <NavigationMenuLink href="#" className="rounded-md p-2 hover:bg-muted/50">
                    Fonctionnalités
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="rounded-md p-2 hover:bg-muted/50">
                    Tarifs
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      );
    case "pagination":
      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    case "popover":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <p className="text-sm">Contenu du popover.</p>
          </PopoverContent>
        </Popover>
      );
    case "progress":
      return <Progress value={62} />;
    case "radio-group":
      return (
        <RadioGroup defaultValue="a">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="a" id="r1" />
            <Label htmlFor="r1">Option A</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="b" id="r2" />
            <Label htmlFor="r2">Option B</Label>
          </div>
        </RadioGroup>
      );
    case "scroll-area":
      return (
        <ScrollArea className="h-24 rounded-lg border border-border">
          <div className="space-y-2 p-3 text-sm text-muted-foreground">
            <p>Ligne 1</p>
            <p>Ligne 2</p>
            <p>Ligne 3</p>
            <p>Ligne 4</p>
            <p>Ligne 5</p>
          </div>
        </ScrollArea>
      );
    case "select":
      return (
        <Select defaultValue="a">
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Choisir…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      );
    case "separator":
      return (
        <div className="w-full">
          <div className="text-sm">Avant</div>
          <Separator className="my-2" />
          <div className="text-sm">Après</div>
        </div>
      );
    case "sheet":
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Ouvrir</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Sheet</SheetTitle>
              <SheetDescription>Exemple de panneau latéral.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
    case "sidebar":
      return (
        <div className="rounded-lg border border-border bg-muted/10 p-3 text-sm text-muted-foreground">
          Preview “Sidebar” : visible dans le layout (barre latérale principale). (Le composant nécessite un provider.)
        </div>
      );
    case "skeleton":
      return (
        <div className="grid gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-56" />
        </div>
      );
    case "sonner":
      return (
        <Button
          variant="outline"
          onClick={() => toast("Hello", { description: "Exemple Sonner/Toast." })}
        >
          Déclencher toast
        </Button>
      );
    case "switch":
      return (
        <div className="flex items-center gap-2">
          <Switch id="s1" defaultChecked />
          <Label htmlFor="s1">Activer</Label>
        </div>
      );
    case "table":
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead className="text-right">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { id: "AUR-1", name: "Exemple", status: "OK" },
              { id: "AUR-2", name: "Démo", status: "Pending" },
            ].map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs">{r.id}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell className="text-right text-muted-foreground">{r.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    case "tabs":
      return (
        <Tabs defaultValue="a" className="w-full">
          <TabsList>
            <TabsTrigger value="a">Résumé</TabsTrigger>
            <TabsTrigger value="b">Détails</TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="text-sm text-muted-foreground">
            Contenu A
          </TabsContent>
          <TabsContent value="b" className="text-sm text-muted-foreground">
            Contenu B
          </TabsContent>
        </Tabs>
      );
    case "textarea":
      return <Textarea placeholder="Message…" />;
    case "toggle":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Toggle aria-label="Bold">Bold</Toggle>
          <Toggle variant="outline" aria-label="Italic">Italic</Toggle>
        </div>
      );
    case "toggle-group":
      return (
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            Center
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      );
    case "tooltip":
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Survol</Button>
          </TooltipTrigger>
          <TooltipContent>Tooltip</TooltipContent>
        </Tooltip>
      );
    case "typography":
      return (
        <div className="space-y-2">
          <Typography variant="h2">Titre (h2)</Typography>
          <Typography variant="muted">Sous-titre / aide</Typography>
          <Typography>Paragraphe de démonstration.</Typography>
        </div>
      );
    case "chart": {
      const option: EChartsCoreOption = {
        grid: { left: 24, right: 16, top: 16, bottom: 24 },
        xAxis: { type: "category", data: ["Lun", "Mar", "Mer", "Jeu", "Ven"] },
        yAxis: { type: "value" },
        series: [{ type: "line", data: [12, 18, 14, 22, 19], smooth: true }],
      };
      return <Chart option={option} height={240} />;
    }
    default:
      return (
        <div className="rounded-lg border border-border bg-muted/10 p-3 text-sm text-muted-foreground">
          Preview non définie (wireframe).
        </div>
      );
  }
}

export function ComponentsShowroom() {
  const [manifest, setManifest] = React.useState<UiManifest | null>(null);
  const [isLoadingManifest, setIsLoadingManifest] = React.useState(true);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [activeKey, setActiveKey] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");
  const [showPlanned, setShowPlanned] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const hasLoadedLibraryRef = React.useRef(false);

  React.useEffect(() => {
    async function loadManifest() {
      setIsLoadingManifest(true);
      try {
        const res = await fetch("/specs/ui-manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error("manifest");
        const data = (await res.json()) as UiManifest;
        setManifest(data);
      } catch {
        toast.error("Impossible de charger le UI manifest.");
      } finally {
        setIsLoadingManifest(false);
      }
    }
    loadManifest();
  }, []);

  React.useEffect(() => {
    async function loadLibrary() {
      try {
        const lib = await getUiLibrary();
        setSelected(new Set(lib.component_keys ?? []));
        hasLoadedLibraryRef.current = true;
      } catch {
        // Silently ignore (unauth, backend down).
      }
    }
    loadLibrary();
  }, []);

  React.useEffect(() => {
    if (!hasLoadedLibraryRef.current) return;
    const keys = [...selected].sort();
    const timer = window.setTimeout(async () => {
      setIsSaving(true);
      try {
        await upsertUiLibrary(keys);
      } catch {
        toast.error("Sauvegarde de la bibliothèque impossible.");
      } finally {
        setIsSaving(false);
      }
    }, 450);

    return () => window.clearTimeout(timer);
  }, [selected]);

  const items = React.useMemo(() => {
    const list = manifest?.items ?? [];
    return list
      .filter((item) => (showPlanned ? true : item.status === "installed"))
      .filter((item) => {
        if (!query.trim()) return true;
        const q = query.trim().toLowerCase();
        return item.key.toLowerCase().includes(q) || item.title.toLowerCase().includes(q);
      })
      .sort((a, b) => a.group.localeCompare(b.group) || a.title.localeCompare(b.title));
  }, [manifest, query, showPlanned]);

  React.useEffect(() => {
    if (!activeKey) return;
    if (!items.some((i) => i.key === activeKey)) {
      setActiveKey(null);
    }
  }, [items, activeKey]);

  const grouped = React.useMemo(() => groupBy(items, (i) => i.group), [items]);

  const selectedItems = React.useMemo(() => {
    if (!manifest) return [] as UiManifestItem[];
    const byKey = new Map(manifest.items.map((i) => [i.key, i]));
    return [...selected]
      .map((k) => byKey.get(k))
      .filter(Boolean)
      .sort((a, b) => a!.group.localeCompare(b!.group) || a!.title.localeCompare(b!.title)) as UiManifestItem[];
  }, [manifest, selected]);

  const selectedCount = selected.size;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base">Showroom — composants</CardTitle>
              <p className="text-xs text-muted-foreground">
                Choisis des primitives pour construire une bibliothèque destinée à l’agent IA.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{selectedCount} sélectionnés</Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelected(new Set());
                  setActiveKey(null);
                }}
              >
                Tout décocher
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowPlanned((v) => !v)}
              >
                {showPlanned ? "Masquer planned" : "Afficher planned"}
              </Button>
              <Button
                size="sm"
                disabled={!manifest}
                onClick={async () => {
                  const payload = { component_keys: [...selected].sort() };
                  try {
                    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
                    toast.success("Bibliothèque copiée (JSON).");
                  } catch {
                    toast.error("Copie impossible.");
                  }
                }}
              >
                Copier JSON
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={!manifest}
                onClick={() => {
                  const payload = { component_keys: [...selected].sort() };
                  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "ui-library.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Télécharger
              </Button>
              {isSaving ? <Badge variant="outline">Sauvegarde…</Badge> : null}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        <Card>
          <CardHeader className="pb-3">
            <div className="space-y-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (button, dialog, …)"
                aria-label="Rechercher"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{items.length} composants</span>
                <span className={cn(isLoadingManifest ? "opacity-100" : "opacity-0")}>Chargement…</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <ScrollArea className="h-[560px] pr-3">
              <div className="space-y-4">
                {[...grouped.entries()].map(([group, groupItems]) => (
                  <div key={group} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {group}
                      </p>
                      <Badge variant="secondary">{groupItems.length}</Badge>
                    </div>
                    <div className="space-y-1">
                      {groupItems.map((item) => {
                        const isSelected = selected.has(item.key);
                        const isActive = activeKey === item.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => {
                              setActiveKey(item.key);
                              setSelected((prev) => {
                                const next = new Set(prev);
                                next.add(item.key);
                                return next;
                              });
                            }}
                            className={cn(
                              "flex w-full items-center gap-2 rounded-lg border border-transparent px-2 py-2 text-left transition-colors",
                              "hover:bg-muted/50",
                              isActive ? "border-border bg-muted/30" : undefined,
                            )}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                const shouldSelect = checked === true;
                                setSelected((prev) => {
                                  const next = new Set(prev);
                                  if (shouldSelect) next.add(item.key);
                                  else next.delete(item.key);
                                  return next;
                                });
                                if (shouldSelect) setActiveKey(item.key);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Sélectionner ${item.title}`}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="truncate text-sm font-medium">{item.title}</p>
                                {item.status !== "installed" ? (
                                  <Badge variant="outline">{item.status}</Badge>
                                ) : null}
                              </div>
                              <p className="truncate text-xs text-muted-foreground">{item.key}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
	            <div className="space-y-1">
	              <CardTitle className="text-base">Sélection</CardTitle>
	              <p className="text-xs text-muted-foreground">
	                {selectedCount} composant{selectedCount > 1 ? "s" : ""} • previews au thème courant
	              </p>
	            </div>
	          </CardHeader>
	          <CardContent className="space-y-4 pt-0">
	            {selectedItems.length ? (
	              <ScrollArea className="h-[560px] pr-3">
	                <div className="space-y-3">
	                  {selectedItems.map((item) => {
	                    const importPath = inferImportPath(item);
	                    const exportName = exportNameForKey(item.key) ?? item.title;
	                    const importSnippet = importPath ? `import { ${exportName} } from "${importPath}";\n` : null;
	                    const example = exampleUsageForKey(item.key);
	
	                    return (
	                      <div key={item.key} className="rounded-lg border border-border bg-card p-3">
	                        <div className="flex items-start justify-between gap-2">
	                          <div className="min-w-0">
	                            <p className="truncate text-sm font-semibold">{item.title}</p>
	                            <p className="truncate text-xs text-muted-foreground">{item.key}</p>
	                          </div>
	                          <Button
	                            size="sm"
	                            variant="outline"
	                            onClick={() => {
	                              setSelected((prev) => {
	                                const next = new Set(prev);
	                                next.delete(item.key);
	                                return next;
	                              });
	                              if (activeKey === item.key) setActiveKey(null);
	                            }}
	                          >
	                            Retirer
	                          </Button>
	                        </div>
	
	                        <div className="mt-3 rounded-lg border border-border bg-background p-3">
	                          {previewForKey(item.key)}
	                        </div>
	
	                        <Accordion type="single" collapsible className="mt-3">
	                          <AccordionItem value="details">
	                            <AccordionTrigger>Détails techniques (pour l’agent)</AccordionTrigger>
	                            <AccordionContent>
	                              <div className="space-y-3">
	                                <div className="flex flex-wrap items-center gap-2">
	                                  {item.allowedIn.map((m) => (
	                                    <Badge key={m} variant="secondary">
	                                      {m}
	                                    </Badge>
	                                  ))}
	                                </div>
	
	                                {item.notes?.length ? (
	                                  <div className="space-y-1 text-sm text-muted-foreground">
	                                    {item.notes.map((n) => (
	                                      <p key={n}>{n}</p>
	                                    ))}
	                                  </div>
	                                ) : null}
	
	                                {importSnippet ? (
	                                  <div className="flex flex-wrap items-center gap-2">
	                                    <code className="rounded-md border border-border bg-muted/30 px-2 py-1 text-xs">
	                                      {importSnippet.trim()}
	                                    </code>
	                                    <CopyButton text={importSnippet} />
	                                  </div>
	                                ) : (
	                                  <p className="text-sm text-muted-foreground">
	                                    Pas de chemin d’import inférable.
	                                  </p>
	                                )}
	
	                                {example ? (
	                                  <div className="space-y-2">
	                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
	                                      Exemple
	                                    </p>
	                                    <pre className="overflow-x-auto rounded-lg border border-border bg-muted/20 p-3 text-xs">
	                                      <code>{example}</code>
	                                    </pre>
	                                    <div className="flex items-center gap-2">
	                                      <CopyButton text={`${example}\n`} label="Copier exemple" />
	                                    </div>
	                                  </div>
	                                ) : null}
	
	                                <div className="space-y-2">
	                                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
	                                    Fichiers
	                                  </p>
	                                  <ul className="space-y-1 text-sm text-muted-foreground">
	                                    {item.files.length ? item.files.map((f) => <li key={f}>{f}</li>) : <li>—</li>}
	                                  </ul>
	                                </div>
	                              </div>
	                            </AccordionContent>
	                          </AccordionItem>
	                        </Accordion>
	                      </div>
	                    );
	                  })}
	                </div>
	              </ScrollArea>
	            ) : (
	              <p className="text-sm text-muted-foreground">
	                Coche des composants à gauche pour les voir ici (empilés).
	              </p>
	            )}
	          </CardContent>
	        </Card>
      </div>
    </div>
  );
}
